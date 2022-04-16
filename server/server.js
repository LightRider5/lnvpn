const express = require('express');
const path = require('path');
const bodyParser = require("body-parser")
const axios = require('axios');
const app = express();
var payment_hash,payment_request;
require('dotenv').config()


const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: true  
  }
})

////////////// Set up the Webserver
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json())

///////Serving the index site
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

/////////Invoice Webhook
app.post(process.env.WEBHOOK, (req, res) => {
    console.log('Hook called')
    io.sockets.emit('invoicePaid',req.body.payment_hash)
    res.status(200).end() 
})
 
app.listen(5000);
////////////// Finish Server Setup

//////Socket Connections
io.on('connection', (socket) => {
  console.log("New connection")
  console.log(' %s socket connected', io.engine.clientsCount) 
  console.log(socket.id)
  /////Geting the Invoice from lnbits and forwarding it to the frontend

  socket.on('getInvoice',(amount) =>{
    console.log('New Invoice');
    getInvoice(amount).then(result => socket.emit("lnbitsInvoice",result))
  })

  socket.on('getWireguardConfig',keyPair => {
    console.log("functoin called")
    getWireguardConfig(keyPair).then(result => socket.emit('reciveConfigData',result))
  })


});


///////// Get Invoice Function
async function getInvoice(amount) {
  var satoshis = await getPrice().then((result) => {return result})
  return axios({
  method: "post",
  url: process.env.URL_INVOICE_API,
  headers: { "X-Api-Key": process.env.INVOICE_KEY},
  data: {
    "out": false, 
    "amount": satoshis*amount, 
    "memo": "LNVPN",
    "webhook" : process.env.URL_WEBHOOK
  } 
    }).then(function (respons){        
      payment_request = respons.data.payment_request;
      payment_hash = respons.data.payment_hash;
      return {payment_hash,payment_request}
    });  
}

////////Get Bitcoin Price in Satoshi per Dollar
async function getPrice() {
  return axios({
    method: "get",
    url: process.env.URL_PRICE_API
  }).then(function (respons){
     const priceBTC = (respons.data.USD.buy);
     var priceOneDollar = (100000000 / priceBTC);
     return priceOneDollar
  })    
};     


//////////////////Get Wireguard Config
async function getWireguardConfig(keyPair,timestamp) {
  return axios({
    method: "post",
    url: process.env.IP_USA,
    headers: { 'Content-Type': 'application/json'},
    data: {
      "publicKey": keyPair.publicKey,
      "presharedKey": keyPair.presharedKey,
      "bwLimit": 1000,
      "subExpiry": "2022-Apr-16 12:39:05 PM",
      "ipIndex": 0
    }
  }).then(function (respons){        
    return respons.data
  }).catch(error => {   
    console.log(error) 
  });
}




