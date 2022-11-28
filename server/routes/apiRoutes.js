const express = require('express')
const router = express.Router()


const {
    getInvoice,
    getTunnelConfig,
} = require('../controllers/apiController')


router.post("/v1/getinvoice", getInvoice);
router.post("/v1/getTunnelConfig", getTunnelConfig);

module.exports = router





