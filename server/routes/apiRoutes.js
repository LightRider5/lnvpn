const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const router = express.Router();

const {
  getInvoice,
  getTunnelConfig,
  getPartnerBalance,
  getCountryList,
} = require("../controllers/apiController");

/**
 * @swagger
 * /api/v1/getInvoice:
 *   post:
 *     description: Returns a Lightning invoice for the requested duration
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               duration:
 *                 type: number
 *                 description: How long the tunnel should be open (0.1, 0.5, 1, 4, 9)
 *                 example: 0.1
 *     responses:
 *       200:
 *         description: Lightning invoice and payment hash
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 invoice:
 *                   type: string
 *                 payment_hash:
 *                   type: string
 */

router.post("/v1/getinvoice", getInvoice);
// /**
//  * @swagger
//  * /api/v1/getTunnelConfig:
//  *   post:
//  *     description: Returns the wireguard configuration for the requested tunnel
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: paymentHash
//  *         description: Payment Hash of the invoice you paid
//  *         in: x-www-form-urlencoded
//  *         required: true
//  *       - name: location
//  *         description: Location of the endpoint as Number. Look at lnvpn.net/api/v1/countrylist
//  *         in: x-www-form-urlencoded
//  *         required: true
//  *       - name: partnerCode
//  *         description: Partner Code created in the affiliates page. Look at https://lnvpn.net/partners
//  *     url: lnvpn.net/api/v1/countrylist
//  *          in: x-www-form-urlencoded
//  *          required: false
//  *
//  *
//  *     responses:
//  *       200:
//  *         description: wireguard config data
//  *         schema:
//  *           type: object
//  */
/**
 * @swagger
 * /api/v1/getTunnelConfig:
 *   post:
 *     description: Returns the wireguard configuration for the requested tunnel
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               paymentHash:
 *                 type: string
 *                 description: Payment hash of the invoice you paid
 *                 example: "lnbc4330n1p3a00kjsp54vx6jrtt2vm3jrr....."
 *               location:
 *                 type: string
 *                 description: Location of the endpoint as a number. Look at lnvpn.net/api/v1/countrylist
 *                 example: 1
 *     responses:
 *       200:
 *         description: Wireguard config data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 config:
 *                   type: string
 */

router.post("/v1/getTunnelConfig", getTunnelConfig);
// /**
//  * @swagger
//  * /api/v1/countryList:
//  *   get:
//  *     description: Returns a country list. Each number is for one location. You can use this number in the location parameter of the getTunnelConfig endpoint.
//  *     produces:
//  *       - application/json
//  *     responses:
//  *       200:
//  *         description: Array with country list
//  *
//  * */
/**
 * @swagger
 * /api/v1/countryList:
 *   get:
 *     description: Returns a list of countries, with a number assigned to each location. The number can be used in the location parameter of the getTunnelConfig endpoint.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cc:
 *                     type: string
 *                     description: The number assigned to the location
 *                   country:
 *                     type: string
 *                     description: The name of the country
 */

router.get("/v1/countrylist", getCountryList);

router.get("/v1/getpartnerbalance/:id", getPartnerBalance);

const options = {
  customSiteTitle: "LNVPN API Documentation",
  customFavIcon: "./public/favicon.ico",
  customCss: ".swagger-ui .topbar { display: none }",
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LNVPN API",
      version: "1.0.0",
      description: "This is the documentation for LNVPN API",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LNVPN",
        url: "https://lnvpn.net",
      },
    },
  },
  apis: ["./routes/apiRoutes*.js"], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/documentation", swaggerUi.serve);
router.get("/documentation", swaggerUi.setup(swaggerSpec));

module.exports = router;
