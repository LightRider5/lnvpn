const express = require("express");
const path = require("path");
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
app.use(express.static(path.join(__dirname, "../client/build")));
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

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build", "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

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
  socket.on("checkInvoice", (clientPaymentHash) => {
    lightning
      .checkInvoice(clientPaymentHash)
      .then((result) => {
        if (result === false) {

          console.log("Invoice not paid")
        }
        else {
          io.sockets.emit("invoicePaid", result.details.payment_hash)
        }
      });
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
    (publicKey, presharedKey, priceDollar, country) => {
      wg.getWireguardConfig(
        publicKey,
        presharedKey,
        timestamp.getTimeStamp(priceDollar),
        vpnServer.getServer(country).ip,
        priceDollar
      ).then((result) =>
        socket.emit(
          "reciveConfigData",
          result,
          timestamp.getTimeStamp(priceDollar),
          vpnServer.getServer(country).location
        )
      );
    }
  );
});
