const express = require('express')
const router = express.Router()


const {
    getUser,
    logoutUser,
    loginUser
} = require('../controllers/loginController')

router.get('/user', getUser)
router.get('/logout', logoutUser)
// router.get('/login', loginUser)

module.exports = router