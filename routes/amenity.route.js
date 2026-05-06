'use strict'
const express = require('express')
const router = express.Router()

const controller = require('../controllers/amenity.controller')
const {
    validHandle,
    validCreate,
    validUpdate,
    validId
} = require('../validators/amenity.validator')

router.get('/', controller.getAll)
router.get('/:id', validId, validHandle, controller.getById)
router.post('/', validCreate, validHandle, controller.create)
router.put('/:id', validUpdate, validHandle, controller.update)
router.delete('/:id', validId, validHandle, controller.remove)

module.exports = router