const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} = require('../controllers/subscriptionController')

// const { protect } = require('../middleware/authMiddleware')
const protect = asyncHandler(async (req, res, next) => {
  
  try {
    req.user = await axios.get("http:localhost:5000")
    next()
  } catch (error) {
    console.log(error)
    res.status(401)
    throw new Error('Not authorized')
  }
})

router.route('/subscriptions/:pubk').get(protect, getSubscriptions).post( protect, createSubscription)
// router.route('/:id').delete( deleteSubscription).put( updateSubscription)



module.exports = router