const axios = require("axios");
const sgMail = require("@sendgrid/mail");

// Get Invoice Function
async function getInvoice(amount, memo) {
  // Ensure the API access token is available
  const accessToken = process.env.API_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Environment variable API_ACCESS_TOKEN is not defined.");
  }

  try {
    // Make the POST request to create an invoice
    const response = await axios({
      method: "post",
      url: "https://api.getalby.com/invoices",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      data: {
        amount: amount, // Pass the amount directly in satoshis
        description: memo,
      },
    });

    const data = response.data;

    // Extract payment_request and payment_hash from the response
    const payment_request = data.payment_request;
    const payment_hash = data.payment_hash;

    return { payment_hash, payment_request };
  } catch (error) {
    console.error("Error in getInvoice:", error.response ? error.response.data : error);
    throw error;
  }
}

// Check Invoice Function
async function checkInvoice(hash) {
  // Ensure the API access token is available
  const accessToken = process.env.API_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Environment variable API_ACCESS_TOKEN is not defined.");
  }

  try {
    // Make the GET request to fetch invoice status
    const response = await axios({
      method: "get",
      url: `https://api.getalby.com/invoices/${hash}`,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    const data = response.data;

    if (data.settled === true) {
      return data; // Return the invoice details if settled
    } else {
      return false; // Invoice not yet settled
    }
  } catch (error) {
    console.error(`Could not checkInvoice:`, error.response ? error.response.data : error);
    throw error;
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
