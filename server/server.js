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
    getInvoice(amount)
    
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


