const express = require("express");
const Order = require("./models/orders");
const Partner = require("./models/partners");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const vpnServer = require("./functions/getServer");
const timestamp = require("./functions/getTimeStamp");
const wg = require("./functions/wireguardFunctions");
const lightning = require("./functions/invoices");
const app = express();
require("dotenv").config();
connectDB();

// app.use(
//     cors({
//         origin: process.env.LOGIN_URL_CLIENT,
//         credentials: true,
//     })
// );

// Set up the Webserver
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/api", require("./routes/apiRoutes"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/test", (req, res, next) => {
  res.send("hello world!");
});

app.use((error, req, res, next) => {
  console.log(error.message);
  console.log(error.status);
  res.json({ status: error.status, error: error.message });
});

// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "../client/build", "index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

const server = app.listen(process.env.WEB_SERVER_PORT, function () {
  console.log("Server listening at Port:" + process.env.WEB_SERVER_PORT);
});

process.on("beforeExit", (code) => {
  try {
    server.close();
  } catch (error) {
    console.error(error);
  }
  process.exit(code);
});

//Finish Webserver setup

const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: process.env.SOCKET_URL_CLIENT,
  },
});

// Invoice Webhook
app.post(process.env.WEBHOOK, (req, res) => {
  console.log("Invoice paid hook called");
  console.log(req.body);
  io.sockets.emit("invoicePaid", req.body.payment_hash);
  res.status(200).end();
});

// Socket Connections and functions

io.on("connection", (socket) => {
  //  console.log("New connection")

  // Checks for a paid Invoice after reconnect
  // Checks for a paid Invoice after reconnect
  socket.on("checkInvoice", async (clientPaymentHash) => {
    try {
      console.log("Checking Invoice in backend")
      console.log(clientPaymentHash)
      const result = await lightning.checkInvoice(clientPaymentHash)
      if (result === false) {
        console.log(result)
        console.log("Invoice not paid")
      }
      else {
        console.log(result + "when true")
        io.sockets.emit("invoicePaid", result.details.payment_hash)
      }
    } catch (error) {
      console.log(error)
    }

  });

  // Getting the Invoice from lnbits and forwarding it to the frontend
  socket.on("getInvoice", (amount) => {
    lightning
      .getInvoice(amount, "LNVPN")
      .then((result) => socket.emit("lnbitsInvoice", result));
  });
  socket.on("sendEmail", (emailAddress, configData, date) => {
    wg.sendEmail(emailAddress, configData, date).then((result) =>
      console.log(result)
    );
  });

  socket.on(
    "getWireguardConfig",
    async (publicKey, presharedKey, priceDollar, country, partnerCode) => {
      wg.getWireguardConfig(
        publicKey,
        presharedKey,
        timestamp.getTimeStamp(priceDollar),
        vpnServer.getServer(country).ip,
        priceDollar,
      ).then((result) =>
        socket.emit(
          "reciveConfigData",
          result,
          timestamp.getTimeStamp(priceDollar),
          vpnServer.getServer(country).location
        )
      );
      console.log("Partner Code: " + partnerCode)
      if (partnerCode !== "none") {
        const satoshis = await lightning.getPrice().then((result) => {
          return result;
        });
        order = new Order();
        order.partnerCode = partnerCode;
        order.amount = priceDollar * satoshis;
        order.save((err, doc) => {
          if (err) {
            console.error("Error saving order:", err);
            socket.emit("addAddressCodeError", "An error occurred while saving the referral code.");
            return;
          }
          console.log("Saved Order successfully!");
        }
        );
      }
    }
  );


  socket.on("addAddressCode", async (payoutAddress, custom_code) => {
    // Check if a partner with the given custom_code already exists
    Partner.findOne({ custom_code: custom_code }, (err, existingPartner) => {
      if (err) {
        console.error("Error checking for existing partner:", err);
        socket.emit("addAddressCodeError", "An error occurred while checking for existing referral code.");
        return;
      }

      // If a partner with the given custom_code exists, emit an error message
      if (existingPartner) {
        console.log("Referral code already exists.");
        socket.emit("addAddressCodeError", "The referral code already exists. Please choose a different one.");
        return;
      }

      // If no partner with the given custom_code exists, proceed with creating and saving the new partner
      const partner = new Partner();
      partner.payoutAddress = payoutAddress;
      partner.custom_code = custom_code;
      partner.save((err, doc) => {
        if (err) {
          console.error("Error saving partner:", err);
          socket.emit("addAddressCodeError", "An error occurred while saving the referral code.");
          return;
        }

        console.log("Document inserted successfully!");
        socket.emit("addAddressCodeSuccess", doc);
      });
    });
  });

  socket.on("addAddressCode", async (payoutAddress, custom_code) => {
    // Check if a partner with the given custom_code already exists
    Partner.findOne({ custom_code: custom_code }, (err, existingPartner) => {
      if (err) {
        console.error("Error checking for existing partner:", err);
        socket.emit("addAddressCodeError", "An error occurred while checking for existing referral code.");
        return;
      }

      // If a partner with the given custom_code exists, emit an error message
      if (existingPartner) {
        console.log("Referral code already exists.");
        socket.emit("addAddressCodeError", "The referral code already exists. Please choose a different one.");
        return;
      }

      // If no partner with the given custom_code exists, proceed with creating and saving the new partner
      const partner = new Partner();
      partner.payoutAddress = payoutAddress;
      partner.custom_code = custom_code;
      partner.save((err, doc) => {
        if (err) {
          console.error("Error saving partner:", err);
          socket.emit("addAddressCodeError", "An error occurred while saving the referral code.");
          return;
        }

        console.log("Document inserted successfully!");
        socket.emit("addAddressCodeSuccess", doc);
      });
    });
  });

});

