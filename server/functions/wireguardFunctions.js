const axios = require("axios");
const sgMail = require("@sendgrid/mail");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);


// Get Wireguard Config
async function getWireguardConfig(
  publicKey,
  presharedKey,
  timestamp,
  server,
  priceDollar
) {
  return axios({
    method: "post",
    url: server,
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH,
    },
    data: {
      publicKey: publicKey,
      presharedKey: presharedKey,
      bwLimit: 10000 * priceDollar,
      subExpiry: parseDate(timestamp),
      ipIndex: 0,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
}


const parseDate = (date) => {
  return dayjs.utc(date).format("YYYY-MMM-DD hh:mm:ss A");
};


// Send Wireguard config file via email
async function sendEmail(emailAddress, configData, date) {
  sgMail.setApiKey(process.env.EMAIL_TOKEN);
  const msg = {
    to: emailAddress,
    from: "thanks@lnvpn.net", // Use the email address or domain you verified above
    subject: `Your LNVPN config file for Wireguard. Valid until: ${+date.toString()}`,
    text: `Thank you for using lnvpn.net. Find your personal config File attached. Don't lose it.\n Your subscription is valid until: ${+date.toString()}`,
    attachments: [
      {
        content: btoa(configData),
        filename: `wireguard-${+date.toString()}.conf`,
        type: "text/plain",
        endings: "native",
        disposition: "attachment",
      },
    ],
  };

  sgMail.send(msg).then(
    () => { },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
}

/////////Construct the Config File
async function buildConfigFile(keyPair, serverResponse, timestamp, location) {
  console.log("buildConfigFile");
  console.log(timestamp)
  const configArray = [
    "[Interface]",
    "PrivateKey = " + keyPair.privateKey,
    "Address = " + serverResponse.ipv4Address,
    "DNS = " + serverResponse.dns,
    " ",
    "# Valid until: " + timestamp,
    "# Location: " + location,
    " ",
    "[Peer]",
    "PublicKey = " + serverResponse.publicKey,
    "PresharedKey = " + keyPair.presharedKey,
    "Endpoint = " + serverResponse.ipAddress + ":" + serverResponse.listenPort,
    "AllowedIPs = " + serverResponse.allowedIPs,
  ];
  return configArray;
}

module.exports = { getWireguardConfig, sendEmail, buildConfigFile };
