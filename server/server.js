const express = require('express');
const path = require('path');
const bodyParser = require("body-parser")
const axios = require('axios');
const sgMail = require('@sendgrid/mail');

var dayjs = require('dayjs');
const { btoa } = require('buffer');
// var customParseFormat = require('dayjs/plugin/customParseFormat')
// // dayjs.extend(customParseFormat)
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

  ////////Checks for a paid Invoice after reconnect
  socket.on('checkInvoice',(clientPaymentHash) => {
    console.log("Check Invoice")  
    checkInvoice(clientPaymentHash).then(result => io.sockets.emit('invoicePaid',result)) 
  })
 
  /////Getting the Invoice from lnbits and forwarding it to the frontend
  socket.on('getInvoice',(amount) =>{
    getInvoice(amount).then(result => socket.emit("lnbitsInvoice",result))
  })
  socket.on('sendEmail',(emailAddress,configData) => {
  sendEmail(emailAddress,configData).then(result => console.log(result))
  })

  socket.on('getWireguardConfig',(publicKey,presharedKey,selectedValue,country) => {
    getWireguardConfig(publicKey,presharedKey,getTimeStamp(selectedValue),getServer(country)).then(result => socket.emit('reciveConfigData',result))
  })
 

});
///Transforms country into server
var getServer = (countrySelector) => {
  var server 
  if (countrySelector == 1){
  var server = process.env.IP_SINGAPUR  
  }
  if (countrySelector == 2){
    var server = process.env.IP_USA  
  }
  if (countrySelector == 3){
    var server = process.env.IP_FIN    
  }   
  if (countrySelector == 4){
    var server = process.env.IP_UK  
  } 
  if (countrySelector == 5){
    var server = process.env.IP_CANADA 
  } 
  return server 
}


///Transforms duration into timestamp
var getTimeStamp = (selectedValue) =>{
  var date = new Date()

  if(selectedValue == 4){
    date = addMonths(date = new Date(),1)
   
    return date
  }
  if(selectedValue == 2){
    date = addWeeks(date = new Date(),1)
    
    return date
  }
  if(selectedValue == 0.5){
    date = addHour(date = new Date(),24)
    
    return date
  }

  if(selectedValue == 0.1){
    date = addHour(date = new Date(),1)
    
    return date
  }

  function addHour (date = new Date(), hour) {  
    date.setHours(date.getHours() + hour)
    return date
  }
  function addWeeks (date = new Date(), weeks) {  
    date.setDate(date.getDate() + weeks * 7)
    return date
  }

  function addMonths(date = new Date(), months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }   
  
}


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
    }).catch(error => {   
      return error
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
async function getWireguardConfig(publicKey,presharedKey,timestamp,server) {
 
  return axios({
    method: "post",
    url: server,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : process.env.AUTH
      },
    data: {
      "publicKey": publicKey,
      "presharedKey": presharedKey,
      "bwLimit": 50000,
      "subExpiry": parseDate(timestamp),
      "ipIndex": 0
    }
  }).then(function (respons){   
    return respons.data
  }).catch(error => { 
    console.log(error)  
    return error
  });
}
//////Parse Date object to string format: YYYY-MMM-DD hh:mm:ss A
const parseDate = (date) => {
  
  var durationEnd = dayjs(date).format("YYYY-MMM-DD hh:mm:ss A")
 
  return durationEnd
}


//////Send Wireguard config file via email
async function sendEmail(emailAddress,configData) {
  sgMail.setApiKey(process.env.EMAIL_TOKEN);
    const msg = {
      to: emailAddress,
      from: 'thanks@lnvpn.net', // Use the email address or domain you verified above
      subject: 'Your LNVPN config file for Wireguard',
      text: "Thank you for using lnvpn.net. Find your personal config File attached. Don't loose it.",
      attachments: [
        {
          content: btoa(configData),
          filename: 'wireguard.conf',
          type : "text/plain",
          endings:'native',
          disposition: 'attachment'
        }
      ],
    };

    sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body)
        }
      });
}
    
    //////////////Check for Invoice
    async function checkInvoice(hash) {
      return axios({
        method: "get",
        url: "https://legend.lnbits.com/api/v1/payments/"+hash,
        headers: { "X-Api-Key": process.env.INVOICE_KEY}
  
      }).then(function (respons){
          
          if(respons.data.paid)  {
            console.log(respons.data.details.payment_hash)
            return respons.data.details.payment_hash
          } 

      })

    }
 
  






