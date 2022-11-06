const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const dayjs = require('dayjs');
const { btoa } = require('buffer');
const connectDB = require('./config/db');
const server = require('./functions/getServer');
const timestamp = require('./functions/getTimeStamp');
const wg = require('./functions/wireguardFunctions');
const lightning = require('./functions/invoices');



const app = express();
require('dotenv').config();

// connectDB();

const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: process.env.SOCKET_URL_CLIENT
  }
})

// Set up the Webserver
app.use(express.static(path.join(__dirname, '../client/build')));
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/subs', require('./routes/subscriptionRoutes'));

// Serving the index site
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  }, function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});
// app.use(errorHandler); 

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
    lightning.checkInvoice(clientPaymentHash).then(result => io.sockets.emit('invoicePaid',result))
  })

  // Getting the Invoice from lnbits and forwarding it to the frontend
  socket.on('getInvoice',(amount) =>{
    lightning.getInvoice(amount).then(result => socket.emit("lnbitsInvoice",result))
  })
  socket.on('sendEmail',(emailAddress,configData,date) => {
  wg.sendEmail(emailAddress,configData,date).then(result => console.log(result))
  })

  socket.on('getWireguardConfig',(publicKey,presharedKey,priceDollar,country) => {
    wg.getWireguardConfig(publicKey,presharedKey,timestamp.getTimeStamp(priceDollar),server.getServer(country).ip,priceDollar).then(result => socket.emit('reciveConfigData',result,timestamp.getTimeStamp(priceDollar),server.getServer(country).location))
  })


});










