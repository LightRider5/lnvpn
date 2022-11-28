const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const router = express.Router()


const {
    getInvoice,
    getTunnelConfig,
} = require('../controllers/apiController')



 /**
   * @swagger
   * /v1/getInvoice:
   *   post:
   *     description: Login to the application
   *     tags: [Users, Login]
   *     produces:
   *       - application/json
   *     parameters:
   *       - $ref: '#/parameters/username'
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: login
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Login'
   */
router.post("/v1/getinvoice", getInvoice);

router.post("/v1/getTunnelConfig", getTunnelConfig);

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

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = router





