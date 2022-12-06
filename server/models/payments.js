const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//

const paymentSchema = new Schema({
    paymentHash: {
        type: String,
        required: true,
        unique: true
    },
    used: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Payment', paymentSchema)