const asyncHandler = require('express-async-handler')
const Subs = require('../models/subscriptionModel')


// @desc    Get subscriptions
// @route   GET /api/subscriptions
// @access  Private
const getSubscriptions = asyncHandler(async (req, res) => {
  const subs = await Subs.find({ user: req.user.id })

  
})


// @desc    Create subscription
// @route   POST /api/subscription
// @access  Private
const createSubscription = asyncHandler(async (req, res) => {
    // Create subscription
  const sub = await Subs.create({
    pubkey,
    endpoint,
    duration
  })

  if (sub) {
        res.status(201).json({
          pubk: sub.pubkey,
          endpoint: sub.endpoint,
          duration: user.duration,
          token: generateToken(user.pubks),
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
    

  res.status(200).json(goal)
})

// @desc    Update subscription
// @route   PUT /api/subs
// @access  Private
const updateSubscription = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedSubscription = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteSubscription = asyncHandler(async (req, res) => {
  const sub = await Subs.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Subscription not found')
  }


  // Make sure the logged in user matches the goal user
  if (subs.pubkey.toString() !== req.user.pubk) {
    res.status(401)
    throw new Error('Subscription not found')
  }

  await subs.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
}