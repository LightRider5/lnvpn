const express = require('express');
const path = require('path');
const bodyParser = require("body-parser")
const axios = require('axios');
const { response } = require('express');
const app = express();
const invoice_read_key = "e2d06b8ab7584f6a96ef4f2f79379c99";
var payment_hash,payment_request;


const io = require("socket.io")(5001, {
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
app.post('/invoicehook', (req, res) => {
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
  url: "https://legend.lnbits.com/api/v1/payments",
  headers: { "X-Api-Key": invoice_read_key},
  data: {
    "out": false, 
    "amount": satoshis*amount, 
    "memo": "LNVPN",
    "webhook" : "https://06d3-217-252-114-173.eu.ngrok.io/invoicehook"
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
    url: "https://blockchain.info/ticker"
  }).then(function (respons){
     const priceBTC = (respons.data.USD.buy);
     var priceOneDollar = (100000000 / priceBTC);
     return priceOneDollar
  })    
};     


//////////////////Get Wireguard Config
async function getWireguardConfig(keyPair) {
  return axios({
    method: "post",
    url: "http://5.161.92.1:8443/manager/key",
    headers: { 'Content-Type': 'application/json'},
    data: {
      "publicKey": keyPair.publicKey,
      "presharedKey": keyPair.presharedKey,
      "bwLimit": 1000,
      "subExpiry": "2022-Apr-15 12:39:05 PM",
      "ipIndex": 0 
    }
  }).then(function (respons){        
    return respons.data
  }).catch(error => {   
    //console.log(error) 
  });
}




