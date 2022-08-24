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


// Server Settings
const createServer = require('http');
const httpServer = createServer.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    // restrict to SOP (Same Origin Policy)
    origin: false
  }
});

DEBUG = true;


const dim = '\x1b[2m'
const undim = '\x1b[0m'

const getDate = timestamp => (timestamp !== undefined ? new Date(timestamp) : new Date()).toISOString()

const logDim = (...args) => console.log(`${getDate()} ${dim}${args.join(' ')}${undim}`)



// app.listen(5000);
// Finish Server Setup
httpServer.listen(process.env.PORT, '0.0.0.0');
console.log(`httpServer listening on port ${process.env.PORT}`);




// This array saves all invoices and wg keys (received by the client connection)
// As soon as the invoice is paid the server sends the config information to the related client
// This prevents sending all information to all clients and only sends a valid wg config to the related client
// The socket is still open for all clients to connect to

let invoiceWGKeysMap = [];

// Restrict entries to prevent an attack to fill the ram memory
const MAXINVOICES = 100;



// helper
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}


// Set up the Webserver
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json())

// Serving the index site
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Invoice Webhook
app.post(process.env.WEBHOOK, (req, res) => {


  const index = invoiceWGKeysMap.findIndex((client) => {
    return client.paymentDetails.payment_hash === req.body.payment_hash
  });

  if (index !== -1) {

    const { paymentDetails, publicKey, presharedKey, priceDollar, country, id } = invoiceWGKeysMap[index]

    // Needed for now to notify the client to stop the spinner
    io.to(id).emit('invoicePaid', paymentDetails.payment_hash)

    // Looks through the invoice map saved into ram and sends the config ONLY to the relevant client
    getWireguardConfig(priceDollar, publicKey, presharedKey, getTimeStamp(priceDollar), getServer(country))
      .then(result => {
        io.to(id).emit('receiveConfigData', result)
        logDim(`Successfully created wg entry for pubkey ${publicKey}`)

        // Remove Invoice Key from ram
        invoiceWGKeysMap.splice(index, 1);

        res.status(200).end()
      })
      .catch(error => {
        DEBUG && logDim(`getConfig(): ${error.message}`)
        res.status(500).end()

      })
  } else {
    logDim(`No Invoice and corresponding connection found in memory`)
    logDim(`Probably Server crashed and lost invoice memory`)

    res.status(500).end()
  }


});


// Socket Connections
io.on('connection', (socket) => {
  // console.log("New connection")


  // Checks for a paid Invoice after reconnection of the client
  // To allow for recovery in calse the client looses connection but pays the invoice
  // an therefore reconnects with another userid
  socket.on('checkInvoice', (clientPaymentHash) => {
    DEBUG && logDim(`checkInvoice() called: ${socket.id}`)
    checkInvoice(clientPaymentHash).then(result => {

      const index = invoiceWGKeysMap.findIndex((client) => {
        return client.paymentDetails.payment_hash === result
      });

      if (index !== -1) {

        const { paymentDetails, publicKey, presharedKey, priceDollar, country } = invoiceWGKeysMap[index]

        io.to(socket.id).emit('invoicePaid', paymentDetails.payment_hash)

        getWireguardConfig(priceDollar, publicKey, presharedKey, getTimeStamp(priceDollar), getServer(country))
          .then(result => {
            io.to(socket.id).emit('receiveConfigData', result)
            logDim(`Successfully created wg entry for pubkey ${publicKey}`)

            // Remove Invoice Key from ram
            invoiceWGKeysMap.splice(index, 1);


          })
          .catch(error => {
            DEBUG && logDim(error.message)
          })
      } else {
        logDim(`No Invoice and corresponding connection found in memory ${socket.id}`)
        logDim(`no way to recover this state in a secure manner | server crashed potentially or client already got the Config from the server`)

      }

    }).catch((error) => logDim(`${error.message}`))
  })

  // Getting the Invoice from lnbits and forwarding it to the frontend
  socket.on('getInvoice', (amount, publicKey, presharedKey, priceDollar, country) => {
    DEBUG && logDim(`getInvoice() called id: ${socket.id}`)


    if (invoiceWGKeysMap.length <= MAXINVOICES) {

      getInvoice(amount, priceDollar).then(result => {

        socket.emit("lnbitsInvoice", result)

        // Safes the client request related to the socket id including the payment_hash to later send the config data only to the right client
        invoiceWGKeysMap.push({ paymentDetails: result, publicKey: publicKey, presharedKey: presharedKey, priceDollar: priceDollar, country: country, id: socket.id, amountSats: amount })
        DEBUG && console.log(invoiceWGKeysMap)

      })
        .catch(error => logDim(error.message))
    } else {
      logDim(`restrict overall invoices to ${MAXINVOICES} to prevent mem overflow `)
    }

  })

  socket.on('sendEmail', (emailAddress, configData, date) => {
    sendEmail(emailAddress, configData, date).then(result => console.log(result))
  })


  socket.on('disconnect', () => {
    console.log(`User disconnected with ID: ${socket.id} `)

    let index = 0

    // Delete all user related invoices and wg information to free memory as soon as a user disconnects
    // Needs to be a loop bc client can create more than one invoice (getNewInvoice)
    while (index !== -1) {
      index = invoiceWGKeysMap.findIndex((client) => {
        return client.id === socket.id
      });
      if (index !== -1) {
        invoiceWGKeysMap.splice(index, 1);
      }
    }
  })




});
///Transforms country into server
const getServer = (countrySelector) => {
  let server
  if (countrySelector == 1) {
    server = process.env.IP_SINGAPUR
  }
  if (countrySelector == 2) {
    server = process.env.IP_USA
  }
  if (countrySelector == 3) {
    server = process.env.IP_FIN
  }
  if (countrySelector == 4) {
    server = process.env.IP_UK
  }
  if (countrySelector == 5) {
    server = process.env.IP_CANADA
  }
  return server
}


// Transforms duration into timestamp
const getTimeStamp = (selectedValue) => {
  // const date = new Date()
  if (selectedValue == 7) {
    date = addMonths(date = new Date(), 3)
    return date
  }
  if (selectedValue == 3) {
    date = addMonths(date = new Date(), 1)
    return date
  }
  if (selectedValue == 1.5) {
    date = addWeeks(date = new Date(), 1)
    return date
  }
  if (selectedValue == 0.5) {
    date = addHour(date = new Date(), 24)
    return date
  }

  if (selectedValue == 0.1) {
    date = addHour(date = new Date(), 1)
    return date
  }

  function addHour(date = new Date(), hour) {
    date.setHours(date.getHours() + hour)
    return date
  }
  function addWeeks(date = new Date(), weeks) {
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
  const satoshis = await getPrice().then((result) => { return result });
  return axios({
    method: "post",
    url: process.env.URL_INVOICE_API,
    headers: { "X-Api-Key": process.env.INVOICE_KEY },
    data: {
      "out": false,
      "amount": satoshis * amount,
      "memo": "LNVPN",
      "webhook": process.env.URL_WEBHOOK
    }
  }).then(function (response) {
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
  }).then(function (response) {
    return 100_000_000 / response.data.USD.buy;
  })
};



// Get Wireguard Config
async function getWireguardConfig(priceDollar, publicKey, presharedKey, timestamp, server) {


  const request1 = {
    method: 'post',
    url: server + 'key',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.AUTH
    },
    data: {
      "publicKey": publicKey,
      "presharedKey": presharedKey,
      "bwLimit": 10000 * priceDollar,
      "subExpiry": parseDate(timestamp),
      "ipIndex": 0
    }
  };

  const response = await axios(request1).catch(error => {
    throw new Error(`Error - wgAPI createKey\n ${error.message}`);
  });

  return response.data

};
// Parse Date object to string format: YYYY-MMM-DD hh:mm:ss A
const parseDate = (date) => {
  return dayjs(date).format("YYYY-MMM-DD hh:mm:ss A");
}


// Send Wireguard config file via email
async function sendEmail(emailAddress, configData, date) {
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
        type: "text/plain",
        endings: 'native',
        disposition: 'attachment'
      }
    ],
  };

  sgMail
    .send(msg)
    .then(() => { }, error => {
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
    url: process.env.URL_INVOICE_API + "/" + hash,
    headers: { "X-Api-Key": process.env.INVOICE_KEY }
  }).then(function (response) {
    if (response.data.paid) {
      return response.data.details.payment_hash;
    }
  })
}








