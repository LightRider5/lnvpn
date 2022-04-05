const express = require('express');
const path = require('path');
const axios = require('axios');
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
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(5000);
////////////// Finish Server Setup

//////Socket Connections
io.on('connection', (socket) => {
  console.log("New connection");
  socket.on('getInvoice', (amount) =>{
    console.log("Get Invoice")
    getWireguardConfig()
    
  })

});


///////// Get Invoice 
async function getInvoice(amount) {
return axios({
  method: "post",
  url: "https://legend.lnbits.com/api/v1/payments",
  headers: { "X-Api-Key": invoice_read_key},
  data: {
    "out": false, 
    "amount": 2000, 
    "memo": "LNVPN"
  }
}).then(function (respons){        
  payment_request = respons.data.payment_request;
  payment_hash = respons.data.payment_hash;
  console.log(payment_hash,payment_request);

});
}

////////Get Bitcoin Price in Satoshi per Dollar
async function getPrice() {
  return axios({
    method: "get",
    url: "https://blockchain.info/ticker"
  }).then(function (respons){
     const priceBTC = (respons.data.USD.buy);
     var priceOneDollar = (100000000 / priceBTC) / 2;
     return priceOneDollar
  })    
};     


//////////////////Get Wireguard Config
async function getWireguardConfig(privateKey) {
  return axios({
    method: "post",
    url: "http://5.161.92.1:8443/manager/key",
    headers: { 'Content-Type': 'application/json'},
    data: {
      "publicKey": privateKey,
      "presharedKey": "2mlByyAqpN6pF+nGcmdM47NDyGgy1PkzmpBjagh79w0=",
      "bwLimit": 1000,
      "subExpiry": "2022-Apr-15 12:39:05 PM",
      "ipIndex": 0
    }
  }).then(function (respons){        
    console.log(respons.data)
  
  }).catch(error => {
    console.log(error)
  });
  }




