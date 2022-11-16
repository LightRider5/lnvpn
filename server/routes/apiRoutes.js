const express = require('express')
const router = express.Router()


const {
    getLnvpnTunnel,
    checkInvoice,
    getWGConfig,
} = require('../controllers/apiController')

router.get('/lnvpnTunnel', getLnvpnTunnel)
router.get('/checkInvoice/:hash', checkInvoice)
// router.get('/api/getWGConfig', getWGConfig)
// // router.get('/login', loginUser)

module.exports = router