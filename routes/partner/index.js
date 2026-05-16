'use strict'
const express = require('express')

const hotelRoutes = require('./hotel.route')
const staffRoutes = require('./staff.route')
const { authenticate, authorize } = require('../../middleware/authenticate')

const router = express.Router()

router.use(authenticate, authorize('Partner'))

router.use('/hotel', hotelRoutes)
router.use('/staff', staffRoutes)

module.exports = router
