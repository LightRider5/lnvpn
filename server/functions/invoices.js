const axios = require("axios");
const sgMail = require("@sendgrid/mail");

// Get Invoice Function
async function getInvoice(amount, memo) {
  const satoshis = await getPrice().then((result) => {
    return result;
  });
  return axios({
    method: "post",
    url: process.env.URL_INVOICE_API,
    headers: { "X-Api-Key": process.env.INVOICE_KEY },
    data: {
      out: false,
      amount: satoshis * amount,
      memo: memo,
      webhook: process.env.URL_WEBHOOK + process.env.WEBHOOK,
    },
  })
    .then(function (response) {
      const payment_request = response.data.payment_request;
      const payment_hash = response.data.payment_hash;
      return { payment_hash, payment_request };
    })
    .catch((error) => error);
}

// Check for Invoice
//Check for Invoice
async function checkInvoice(hash) {
  try {
    const invoiceData = await axios({
      method: "get",
      url: `${process.env.URL_INVOICE_API}/${hash}`,
      headers: { "X-Api-Key": process.env.INVOICE_KEY },
    })
    if (invoiceData.data.paid === true) {
      return invoiceData.data; ////Edit to return details
    }
    else {
      return false;
    }
  }
  catch (error) {
    console.error(`Could not checkInvoice: ${error}`);
  }
}
// Get Bitcoin Price in Satoshi per Dollar
async function getPrice() {
  return axios({
    method: "get",
    url: process.env.URL_PRICE_API,
  }).then(function (response) {
    return 100_000_000 / response.data.USD.buy;
  });
}

module.exports = { getInvoice, getPrice, checkInvoice };
