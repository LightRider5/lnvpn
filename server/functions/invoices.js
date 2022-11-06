const axios = require('axios');
const sgMail = require('@sendgrid/mail');

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
    "webhook" : process.env.URL_WEBHOOK + process.env.WEBHOOK
  }
    }).then(function (response){
      const payment_request = response.data.payment_request;
      const payment_hash = response.data.payment_hash;
      return { payment_hash, payment_request };
    }).catch(error => error);
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

// Get Bitcoin Price in Satoshi per Dollar
async function getPrice() {
  return axios({
    method: "get",
    url: process.env.URL_PRICE_API
  }).then(function (response){
     return 100_000_000 / response.data.USD.buy;
  })
}

module.exports = {getInvoice, getPrice, checkInvoice}