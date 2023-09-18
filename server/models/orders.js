const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order = new Schema({
    partnerCode: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },

},
    {
        timestamps: true,
    })

module.exports = mongoose.model('Order', order)