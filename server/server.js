const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const LnurlAuth = require("passport-lnurl-auth");
const passport = require('passport');
const session = require('express-session');
const cors = require("cors");
const { btoa } = require('buffer');
const connectDB = require('./config/db');
const vpnServer = require('./functions/getServer');
const timestamp = require('./functions/getTimeStamp');
const wg = require('./functions/wireguardFunctions');
const lightning = require('./functions/invoices');
const app = express();
require('dotenv').config();
// connectDB();

app.use(
    cors({
        origin: process.env.LOGIN_URL_CLIENT,
        credentials: true,
    })
);

const config = {
	host: 'localhost',
	port: 5000,
	url: null,
};

if (!config.url) {
	config.url = 'http://' + config.host + ':' + config.port;
}



app.use(session({
	secret: '12345',
	resave: true,
	saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const map = {
	user: new Map(),
};

// Set up the Webserver
app.use(bodyParser.json()) 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/subs', require('./routes/subscriptionRoutes'));

// Serving the index site
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function (req, res) {
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


passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	done(null, map.user.get(id) || null);
});

passport.use(new LnurlAuth.Strategy(function(linkingPublicKey, done) {
	let user = map.user.get(linkingPublicKey);
	if (!user) {
		user = { id: linkingPublicKey };
		map.user.set(linkingPublicKey, user);
	}
	done(null, user);
}));

app.use(passport.authenticate('lnurl-auth'));

app.get('/login',
	function(req, res, next) {
    if (req.user) {
      // Already authenticated.
      console.log("Already authenticated");
      return res.redirect('http://localhost:3000/');
    }
		next();
	},
	new LnurlAuth.Middleware({
		callbackUrl: config.url + '/login',
		cancelUrl: "http://localhost:3000/",
		refreshSeconds: 5,
        loginTemplateFilePath: path.join(__dirname, 'login.html'),
	})
);


app.get("/user", (req, res) => {
    res.send(req.user);
})

app.get('/logout',
	function(req, res, next) {
		if (req.user) {
            req.session.destroy();
            res.json({message: "user logged out"});
			// Already authenticated.
			return res.redirect('http://localhost:3000/');
		}
    next();
    return
	});

process.on('uncaughtException', error => {
	console.error(error);
});

process.on('beforeExit', code => {
	try {
		server.close();
	} catch (error) {
		console.error(error);
	}
	process.exit(code);
});


const server = app.listen(process.env.WEB_SERVER_PORT, function() {
	console.log('Server listening at Port:' + process.env.WEB_SERVER_PORT);
});

process.on('uncaughtException', error => {
	console.error(error);
});

process.on('beforeExit', code => {
	try {
		server.close();
	} catch (error) {
		console.error(error);
	}
	process.exit(code);
});


//Finish Webserver setup

// Invoice Webhook
app.post(process.env.WEBHOOK, (req, res) => {

    io.sockets.emit('invoicePaid',req.body.payment_hash)
    res.status(200).end()
})






// Socket Connections and functions

const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: process.env.SOCKET_URL_CLIENT
  }
})

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
    wg.getWireguardConfig(publicKey,presharedKey,timestamp.getTimeStamp(priceDollar),vpnServer.getServer(country).ip,priceDollar).then(result => socket.emit('reciveConfigData',result,timestamp.getTimeStamp(priceDollar),vpnServer.getServer(country).location))
  })


});










