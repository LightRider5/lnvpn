const asyncHandler = require('express-async-handler')
// const LnurlAuth = require("passport-lnurl-auth");
// const path = require('path');
// const passport = require('passport');



// @desc    Get user pubkey
// @route   GET /user
// @access  Public

const getUser = asyncHandler(async (req, res) => {
    //res.status(200).json(req.user)
    res.send(req.user);
    console.log(req.user);
})

// @desc    Logout a user
// @route   GET /logout
// @access  Public

const logoutUser = asyncHandler(async (req, res) => { 
    if (req.user) {
            req.session.destroy();
            res.json({message: "user logged out"});
			// Already authenticated.
			return res.redirect('http://localhost:3000/');
		}
})

// @desc    Login a user
// @route   GET /login
// @access  Public

// const loginUser = function (req, res, next) {
//     if (req.user) {
//         // Already authenticated.
//         console.log("Already authenticated");
//         return res.redirect('http://localhost:3000/');
//     }
	
//     new LnurlAuth.Middleware({
//         callbackUrl: config.url + '/login',
//         cancelUrl: "http://localhost:3000/",
//         refreshSeconds: 3,
//         loginTemplateFilePath: path.join(__dirname, '../login.html'),
//     })
// }



// app.get('/login',
// 	function(req, res, next) {
//     if (req.user) {
//       // Already authenticated.
//       console.log("Already authenticated");
//       return res.redirect('http://localhost:3000/');
//     }
// 		next();
// 	},
// 	new LnurlAuth.Middleware({
// 		callbackUrl: config.url + '/login',
// 		cancelUrl: "http://localhost:3000/",
// 		refreshSeconds: 3,
//         loginTemplateFilePath: path.join(__dirname, 'login.html'),
// 	})
// );


module.exports = {
  getUser, logoutUser
}

