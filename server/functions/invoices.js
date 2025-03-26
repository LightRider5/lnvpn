const axios = require("axios");
const sgMail = require("@sendgrid/mail");

// Get Bitcoin Price in Satoshi per Dollar
async function getPrice() {
  try {
    const response = await axios({
      method: "get",
      url: process.env.URL_PRICE_API,
    });
    const data = response.data;

    if (!data || !data.USD || typeof data.USD.buy !== 'number') {
      throw new Error("Invalid data format received from price API.");
    }

    // Return satoshis per USD
    return 100000000 / data.USD.buy;
  } catch (error) {
    console.error("Error fetching price:", error);
    return null;
  }
}

// Get Invoice Function
async function getInvoice(amount, memo) {
  // Ensure the API access token is available
  const accessToken = process.env.API_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Environment variable API_ACCESS_TOKEN is not defined.");
  }

  // Get the satoshis per USD from the getPrice function
  const satoshisPerUsd = await getPrice();
  if (satoshisPerUsd === null) {
    throw new Error("Could not get satoshis per USD from getPrice()");
  }

  // Calculate the amount in satoshis
  const amountInSatoshis = Math.round(satoshisPerUsd * amount);

  // Ensure the amount is an integer
  if (isNaN(amountInSatoshis) || amountInSatoshis <= 0) {
    throw new Error("Invalid amount. Amount must be a positive integer.");
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
        amount: amountInSatoshis, // Pass the amount in satoshis
        description: memo,
      },
    });

    const data = response.data;

    // Extract payment_request and payment_hash from the response
    const payment_request = data.payment_request;
    const payment_hash = data.payment_hash;

    return { payment_hash, payment_request };
  } catch (error) {
    console.error(
      "Error in getInvoice:",
      error.response ? error.response.data : error
    );
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
    console.log(data)

    if (data.settled === true) {
      return data; // Return the invoice details if settled
    } else {
      return false; // Invoice not yet settled
    }
  } catch (error) {
    console.error(
      `Could not checkInvoice:`,
      error.response ? error.response.data : error
    );
    throw error;
  }
}

module.exports = { getInvoice, getPrice, checkInvoice };
