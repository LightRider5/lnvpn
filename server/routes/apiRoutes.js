const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const router = express.Router()


const {
    getInvoice,
    getTunnelConfig,
    getCountryList,
} = require('../controllers/apiController')



 /**
   * @swagger
   * /api/v1/getInvoice:
   *   post:
   *     description: Returns a Lightning invoice for the requested duration
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: duration
   *         description: How long the tunnel should be open
   *         in: x-www-form-urlencoded
   *         required: true
   *         example: 0.1 = 1 hour, 0.5 = 1 day, 1.5 = 1 week , 4 = 1 month, 9 = 3 months
   *         schema:
   *            type: integer

   *     responses:
   *       200:
   *         description: Lightning Invoice and Payment Hash
   *         schema:
   *           type: json
   */
router.post("/v1/getinvoice", getInvoice);
/**
   * @swagger
   * /api/v1/getTunnelConfig:
   *   post:
   *     description: Returns the wireguard configuration for the requested tunnel
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: paymentHash
   *         description: Payment Hash of the invoice you paid
   *         in: x-www-form-urlencoded
   *         required: true
   *       - name: location
   *         description: Location of the endpoint as Number. Look at lnvpn.net/api/v1/countrylist
   *         in: x-www-form-urlencoded
   *         required: true
   *     url: lnvpn.net/api/v1/countrylist
   *         

   *     responses:
   *       200:
   *         description: wireguard config data
   *         schema:
   *           type: object
   */
router.post("/v1/getTunnelConfig", getTunnelConfig);
/**
   * @swagger
   * /api/v1/countryList:
   *   get:
   *     description: Returns a country list. Each number is for one location. You can use this number in the location parameter of the getTunnelConfig endpoint.
   *     produces:
   *       - application/json
   *     responses:
   *       200: 
   *         description: Array with country list
   * 
   * */

router.get("/v1/countrylist", getCountryList);

const options = {
    
        definition: {
            openapi: '3.0.0',
            info: {
            title: 'LNVPN API',
            version: '1.0.0',
            description:
            'This is the documentation for LNVPN API',
            license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
            name: 'LNVPN',
            url: 'https://lnvpn.net',
            },
        },
    },
    apis: ['./routes/apiRoutes*.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/documentation', swaggerUi.serve);
router.get('/documentation', swaggerUi.setup(swaggerSpec));

module.exports = router





