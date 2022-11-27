
const Payment = require("../models/payments");
const jwt = require("jsonwebtoken");
const lightning = require('../functions/invoices')
const asyncHandler = require('express-async-handler')
const wg = require('../functions/wireguardFunctions')
const timestamp = require('../functions/getTimeStamp');
const vpnServer = require('../functions/getServer');
const generateKeyPair = require('../functions/wireguard');



require('dotenv').config();


const getInvoice = asyncHandler(async (req, res, next) => {
    // expects a POST request with json-data: {"duration":<0.1,0.5,1.5,4,9>}
    const duration = req.body.duration;
    if (!duration) {
        const err = new Error("Duration missing");
        err.status = 400;
        next(err);
    }

    if (!(duration === process.env.PRICE_HOUR || duration === process.env.PRICE_DAY
        || duration === process.env.PRICE_WEEK || duration === process.env.PRICE_QUARTER)) {
        res.status(400)
        const err = new Error('Duration not allowed. Please choose between 1 hour, 1 day, 1 week or 1 quarter.')   
        err.status = 400;
        next(err);
    } 
    
        const invoice = await lightning.getInvoice(duration);
        res.status(200).send(invoice)

});
  


 const getTunnelConfig = asyncHandler(async  (req, res, next) => {
    const { paymentHash, location, duration } = req.body;
    if (!paymentHash || !location || !duration) {
        const err = new Error("missing Parameter");
        err.status = 400;
        next(err);
    } else {
        const result = await Payment.findOne({ paymentHash: paymentHash });
            if (!result) {
                throw new Error("paymentHash used before");
            }
        
        const data = await lightning.checkInvoice(paymentHash);
        
            if (!data.detail && data.paid === true) {
                // try {
                //     const payment = new Payment();
                //     payment.paymentHash = paymentHash;
                //     payment.used = true;
                //     payment.save();
                // } catch (err) {
                //     err.status = 500;
                //     throw err;
                // }
                const configTimeStamp = await timestamp.getTimeStamp(duration);
                const server = await vpnServer.getServer(location);
                const keyPair = await generateKeyPair()
                
                const serverResponse = await wg.getWireguardConfig(
                    keyPair.publicKey,
                    keyPair.presharedKey,
                    configTimeStamp,
                    server.ip,
                    duration)
                
                const configData = await wg.buildConfigFile(
                    keyPair,
                    serverResponse,
                    configTimeStamp,
                    server.location)
                
                
                res.json({ WireguardConfig: configData });

            } else {
                const err = new Error("paymentHash is invalid or unpaid");
                err.status = 400;
                next(err);
            }
         
    }
});



module.exports = { getInvoice, getTunnelConfig}





