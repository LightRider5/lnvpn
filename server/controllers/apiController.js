const asyncHandler = require('express-async-handler')
const lightning = require('../functions/invoices')
const wireguard = require('../functions/wireguardFunctions')
const timestamp = require('../functions/getTimeStamp');
const { generateKeypair } = require('../functions/wireguard');



// const orders = require('../server')
require('dotenv').config();

const apiOrders = [];
  
const getLnvpnTunnel = asyncHandler(async (req, res) => {
    const { location, duration } = req.body

    if (!location || !duration) {
        res.status(400)
        throw new Error('Duration or location is missing')
    }

    if (!(duration === process.env.PRICE_HOUR || duration === process.env.PRICE_DAY
        || duration === process.env.PRICE_WEEK || duration === process.env.PRICE_QUARTER)) {
        res.status(400)
        throw new Error('Duration not allowed. Please choose between 1 hour, 1 day, 1 week or 1 quarter.')
    }
    
    const invoice = await lightning.getInvoice(duration)
    const order = {
        invoice_hash: invoice.payment_hash,
        invoice: invoice.payment_request,
        location: location,
        duration: duration
    }
    apiOrders.push(order)
    res.status(200).json(order)
    console.log(apiOrders)
   

})

const checkInvoice = asyncHandler(async (req, res) => {
    const { payment_hash } = req.body
    const result = await lightning.checkInvoice(payment_hash)
    
    const keyPair = generateKeypair
    
        console.log(keyPair)   
        res.status(200).json(keyPair)        

})

module.exports = { getLnvpnTunnel, checkInvoice }


        // const order = apiOrders.find(order => order.invoice_hash === req.params.hash)
        // const config = await wg.getWireguardConfig(keygenerator.wireguard.getPublicKey(), keygenerator.getPresharedKey(), timestamp.getTimeStamp(order.duration), vpnServer.getServer(order.location).ip, order.duration)
        // res.status(200).json(config)
    // }
    
    
    // if (result === req.params.hash) {

    //     res.status(200).json({paid:"true","Message":"Invoice Paid"})
    // } else {
    //     res.status(200).json({paid:"false","Message":"Invoice not Paid"})
    // }
   