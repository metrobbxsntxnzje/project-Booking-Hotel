'use strict'
const express = require('express')
const router = express.Router()

const controller = require('../../controllers/partner/hotel.controller')

const {
    validateCreateHotel
} = require('../../validators/hotel.validator')

router.get('/', controller.getAllController)
router.get('/:id', validateCreateHotel, controller.getByIdController)
router.post('/', validateCreateHotel, controller.createController)
router.put('/:id', validateCreateHotel, controller.updateController)
router.delete('/:id', validateCreateHotel, controller.removeController)

module.exports = router