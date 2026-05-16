'use strict'
const express = require('express')
const router = express.Router()

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

module.exports = router
