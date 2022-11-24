const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const LnurlAuth = require("passport-lnurl-auth");
const passport = require('passport');
const session = require('express-session');
const cors = require("cors");
// const { btoa } = require('buffer');
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
// app.use(passport.authenticate('lnurl-auth'));
// app.use('/', require('./routes/loginRoutes'));
app.use(express.static(path.join(__dirname, '../client/build')));
// app.use('/subscriptions', require('./routes/subscriptionRoutes'));
app.use('/api', require('./routes/apiRoutes'));

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

app.get('/login', function(req, res, next) {
    if (req.user) {
      // Already authenticated.
      console.log("Already authenticated");
      return res.redirect('http://localhost:3000/dashboard');
    }
		next();
	},
	new LnurlAuth.Middleware({
		callbackUrl: config.url + '/login',
		cancelUrl: "http://localhost:3000/",
		refreshSeconds: 3,
        loginTemplateFilePath: path.join(__dirname, 'login.html'),
	})
);


app.get("/user", (req, res) => {
	res.send(req.user);
	console.log(req.user);
	// res.status(200).json(req.user);
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
///Transforms country into server
const getServer = (countrySelector) => {
  let server = new Object();
  switch (countrySelector) {
    case '1':
      server.ip = process.env.IP_SINGAPUR
      server.location = "Singapur"
     break;
    case '2':
      server.ip = process.env.IP_USA
      server.location = "USA"
    break;  
    case '3':
      server.ip = process.env.IP_FIN
      server.location = "Finland"
    break;
    case '4':
      server.ip = process.env.IP_UK
      server.location = "United Kingdom"
    break;
    case '5':
      server.ip = process.env.IP_CANADA
      server.location = "Canada"
    break;
    case '6':
      server.ip = process.env.IP_IND
      server.location = "India"
    break;
    case '7':
      server.ip = process.env.IP_NLD
      server.location = "Netehrlands"
    break;
    case '8':
      server.ip = process.env.IP_RUS
      server.location = "Russia"
    break;
    case '9':
      server.ip = process.env.IP_UKR
      server.location = "Ukraine"
    break;
    case '10':
      server.ip = process.env.IP_CHE
      server.location = "Switzerland"
    break;
    case '11':
      server.ip = process.env.IP_ISR
      server.location = "Israel"
    break;
    case '12':
      server.ip = process.env.IP_KAZ
      server.location = "Kazakhstan"
    break;  
    case '13':
      server.ip = process.env.IP_USA2
      server.location = "USA 2 (New York)"
      break;
    case '14':
      server.ip = process.env.IP_ROU
      server.location = "Romania"
      break;
    case '15':
      server.ip = process.env.IP_GHA
      server.location = "Ghana"
      break; 
    case '16':
      server.ip = process.env.IP_PRT
      server.location = "Portugal"
      break;
    case '17':
      server.ip = process.env.IP_ESP
      server.location = "Spain"
    break;

    default:
      console.log(`Error with country selector: ${countrySelector}`);
      
  }
  return server;
} 


// Transforms duration into timestamp
const getTimeStamp = (selectedValue) =>{
  // const date = new Date()
  if(selectedValue == process.env.PRICE_QUARTER){
    date = addMonths(date = new Date(),3)
    return date
  }
  if(selectedValue == process.env.PRICE_MONTH){
    date = addMonths(date = new Date(),1)
    return date
  }
  if(selectedValue == process.env.PRICE_WEEK){
    date = addWeeks(date = new Date(),1)
    return date
  }
  if(selectedValue == process.env.PRICE_DAY){
    date = addHour(date = new Date(),24)
    return date
  }

  if(selectedValue == process.env.PRICE_HOUR){
    date = addHour(date = new Date(),1)
    return date
  }

  function addHour (date = new Date(), hour) {
    date.setHours(date.getHours() + hour)
    return date
  }
  function addWeeks (date = new Date(), weeks) {
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

// Get Bitcoin Price in Satoshi per Dollar
async function getPrice() {
  return axios({
    method: "get",
    url: process.env.URL_PRICE_API
  }).then(function (response){
     return 100_000_000 / response.data.USD.buy;
  })
};


// Get Wireguard Config
async function getWireguardConfig(publicKey, presharedKey, timestamp, server, priceDollar) {

  return axios({
    method: "post",
    url: server,
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : process.env.AUTH
      },
    data: {
      "publicKey": publicKey,
      "presharedKey": presharedKey,
      "bwLimit": 10000*priceDollar,
      "subExpiry": parseDate(timestamp),
      "ipIndex": 0
    }
  }).then(function (response){
    return response.data;
  }).catch(error => {
    console.error(error)
    return error;
  });
}
// Parse Date object to string format: YYYY-MMM-DD hh:mm:ss A
const parseDate = (date) => {
  return dayjs(date).format("YYYY-MMM-DD hh:mm:ss A");
}









