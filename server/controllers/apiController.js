
const Payment = require("../models/payments");
const lightning = require('../functions/invoices')
const asyncHandler = require('express-async-handler')
const wg = require('../functions/wireguardFunctions')
const timestamp = require('../functions/getTimeStamp');
const vpnServer = require('../functions/getServer');
const generateKeyPair = require('../functions/wireguard');
const vpnendpoints = require('../config/vpnendpoints');


require('dotenv').config();


const getInvoice = asyncHandler(async (req, res, next) => {
   
    const duration = req.body.duration;
    if (!duration) {
        const err = new Error("Duration missing");
        err.status = 400;
        next(err);
    }

    if (!(duration === process.env.PRICE_HOUR ||
        duration === process.env.PRICE_DAY ||
        duration === process.env.PRICE_WEEK ||
        duration === process.env.PRICE_MONTH ||
        duration === process.env.PRICE_QUARTER))
    {
        const err = new Error('Duration not allowed. Use: ' +
            process.env.PRICE_HOUR + ' ' +
            process.env.PRICE_DAY + ' ' +
            process.env.PRICE_WEEK + ' ' +
            process.env.PRICE_MONTH + ' ' +
            process.env.PRICE_QUARTER);  
        err.status = 400;
        next(err);
    } 
    
        const invoice = await lightning.getInvoice(duration,duration);
        res.status(200).send(invoice)

});
  
 const getTunnelConfig = asyncHandler(async  (req, res, next) => {
    const { paymentHash, location } = req.body;
    if (!paymentHash || !location) {
        const err = new Error("missing Parameter");
        err.status = 400;
        next(err);
    } else {
        const data = await lightning.checkInvoice(paymentHash);
        const duration = data.details.memo;
        
       
            const result = await Payment.findOne({ paymentHash: paymentHash });
            if (result) {
                const err = new Error("paymentHash used before");
                err.status = 400;
                next(err);
            }
        
            if (!result && (!data.detail && data.paid === true)) {
                try {
                    const payment = new Payment();
                    payment.paymentHash = paymentHash;
                    payment.used = true;
                    payment.save();
                } catch (err) {
                    err.status = 500;
                    throw err;
                }
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

const getCountryList = asyncHandler(async (req, res, next) => { 
    res.status(200).send(vpnendpoints)
})



module.exports = { getInvoice, getTunnelConfig,getCountryList}





