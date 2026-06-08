'use strict'
const express = require('express')
const router = express.Router()
const staffRoutes = require('./staff.route');
const roomConfigRoutes = require('./room.route.js')
const pricingRoutes = require('./pricing.route');

const controller = require('../../controllers/partner/hotel.controller')
const {
    validateCreateHotel,
    validateUpdateHotel
} = require('../../validators/hotel.validator')

router.get('/', controller.getAllController)
router.get('/:id', controller.getByIdController)
router.post('/', validateCreateHotel, controller.createController)
router.put('/:id', validateUpdateHotel, controller.updateController)
router.delete('/:id', controller.removeController)

router.use('/:hotelId/staff', staffRoutes);
router.use('/:hotelId/room', roomConfigRoutes);
router.use('/:hotelId', pricingRoutes);

module.exports = router
