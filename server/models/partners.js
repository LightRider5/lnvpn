const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partner = new Schema({
    payoutAddress: {
        type: String,
        required: true,

    },
    custom_code: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    })

module.exports = mongoose.model('Partner', partner)