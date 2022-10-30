const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const dayjs = require('dayjs');
const { btoa } = require('buffer');
// const customParseFormat = require('dayjs/plugin/customParseFormat');
// dayjs.extend(customParseFormat);
const app = express();
require('dotenv').config();

const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: process.env.SOCKET_URL_CLIENT
  }
})

// Set up the Webserver
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json())

// Serving the index site
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

// Invoice Webhook
app.post(process.env.WEBHOOK, (req, res) => {

    io.sockets.emit('invoicePaid',req.body.payment_hash)
    res.status(200).end()
})

app.listen(process.env.WEB_SERVER_PORT);
// Finish Server Setup

// Socket Connections
io.on('connection', (socket) => {
  // console.log("New connection")


  // Checks for a paid Invoice after reconnect
  socket.on('checkInvoice',(clientPaymentHash) => {
    checkInvoice(clientPaymentHash).then(result => io.sockets.emit('invoicePaid',result))
  })

  // Getting the Invoice from lnbits and forwarding it to the frontend
  socket.on('getInvoice',(amount) =>{
    getInvoice(amount).then(result => socket.emit("lnbitsInvoice",result))
  })
  socket.on('sendEmail',(emailAddress,configData,date) => {
  sendEmail(emailAddress,configData,date).then(result => console.log(result))
  })

  socket.on('getWireguardConfig',(publicKey,presharedKey,priceDollar,country) => {
    getWireguardConfig(publicKey,presharedKey,getTimeStamp(priceDollar),getServer(country).ip,priceDollar).then(result => socket.emit('reciveConfigData',result,getTimeStamp(priceDollar),getServer(country).location))
  })


});
///Transforms country into server
const getServer = (countrySelector) => {
  let server = new Object();
  switch (countrySelector) {
    case '1':
      server.ip = process.env.IP_SINGAPUR
      server.location = "Singapur"
     break;
    case '2':
      server.ip = process.env.IP_USA
      server.location = "USA"
    break;  
    case '3':
      server.ip = process.env.IP_FIN
      server.location = "Finland"
    break;
    case '4':
      server.ip = process.env.IP_UK
      server.location = "United Kingdom"
    break;
    case '5':
      server.ip = process.env.IP_CANADA
      server.location = "Canada"
    break;
    case '6':
      server.ip = process.env.IP_IND
      server.location = "India"
    break;
    case '7':
      server.ip = process.env.IP_NLD
      server.location = "Netehrlands"
    break;
    case '8':
      server.ip = process.env.IP_RUS
      server.location = "Russia"
    break;
    case '9':
      server.ip = process.env.IP_UKR
      server.location = "Ukraine"
    break;
    case '10':
      server.ip = process.env.IP_CHE
      server.location = "Switzerland"
    break;
    case '11':
      server.ip = process.env.IP_ISR
      server.location = "Israel"
    break;
    case '12':
      server.ip = process.env.IP_KAZ
      server.location = "Kazakhstan"
    break;  
    case '13':
      server.ip = process.env.IP_BRA
      server.location = "Brazil"
    break;

    default:
      console.log(`Error with country selector: ${countrySelector}`);
      
  }
  return server;
}


// Transforms duration into timestamp
const getTimeStamp = (selectedValue) =>{
  // const date = new Date()
  if(selectedValue == process.env.PRICE_QUARTER){
    date = addMonths(date = new Date(),3)
    return date
  }
  if(selectedValue == process.env.PRICE_MONTH){
    date = addMonths(date = new Date(),1)
    return date
  }
  if(selectedValue == process.env.PRICE_WEEK){
    date = addWeeks(date = new Date(),1)
    return date
  }
  if(selectedValue == process.env.PRICE_DAY){
    date = addHour(date = new Date(),24)
    return date
  }

  if(selectedValue == process.env.PRICE_HOUR){
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
    const d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

}


// Get Invoice Function
async function getInvoice(amount) {
  const satoshis = await getPrice().then((result) => {return result});
  return axios({
  method: "post",
  url: process.env.URL_INVOICE_API,
  headers: { "X-Api-Key": process.env.INVOICE_KEY},
  data: {
    "out": false,
    "amount": satoshis * amount,
    "memo": "LNVPN",
    "webhook" : process.env.URL_WEBHOOK +"/webhook"
  }
    }).then(function (response){
      const payment_request = response.data.payment_request;
      const payment_hash = response.data.payment_hash;
      return { payment_hash, payment_request };
    }).catch(error => error);
}

// Get Bitcoin Price in Satoshi per Dollar
async function getPrice() {
  return axios({
    method: "get",
    url: process.env.URL_PRICE_API
  }).then(function (response){
     return 100_000_000 / response.data.USD.buy;
  })
};


// Get Wireguard Config
async function getWireguardConfig(publicKey, presharedKey, timestamp, server, priceDollar) {

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
      "bwLimit": 10000*priceDollar,
      "subExpiry": parseDate(timestamp),
      "ipIndex": 0
    }
  }).then(function (response){
    return response.data;
  }).catch(error => {
    console.error(error)
    return error;
  });
}
// Parse Date object to string format: YYYY-MMM-DD hh:mm:ss A
const parseDate = (date) => {
  return dayjs(date).format("YYYY-MMM-DD hh:mm:ss A");
}


// Send Wireguard config file via email
async function sendEmail(emailAddress,configData, date) {
  sgMail.setApiKey(process.env.EMAIL_TOKEN);
    const msg = {
      to: emailAddress,
      from: 'thanks@lnvpn.net', // Use the email address or domain you verified above
      subject: `Your LNVPN config file for Wireguard. Valid until: ${+date.toString()}`,
      text: `Thank you for using lnvpn.net. Find your personal config File attached. Don't lose it.\n Your subscription is valid until: ${+date.toString()}`,
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

    // Check for Invoice
    async function checkInvoice(hash) {
      return axios({
        method: "get",
        url: `https://legend.lnbits.com/api/v1/payments/${hash}`,
        headers: { "X-Api-Key": process.env.INVOICE_KEY}
      }).then(function (response){
          if(response.data.paid)  {
            return response.data.details.payment_hash;
          }
      })
    }








