const mongoose = require('mongoose')

const subsSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: 'User',
    },
    endpoint: {
      type: String,
      required: [true, 'Please add an endpoint'],
    },
    duration: {
      type: String,
      required: [true, 'Please enter a duration end Date'],
    },
  },

)

module.exports = mongoose.model('Subs', subsSchema)