'use strict'
const express = require('express')

const hotelRoutes = require('./hotel.route')

const { authenticate, authorize } = require('../../middleware/authenticate')

const router = express.Router()

router.use(authenticate, authorize('Partner'))

router.use('/hotel', hotelRoutes)



module.exports = router
