'use strict'
const express = require('express')
const router = express.Router()

const controller = require('../controllers/bedtype.controller')
const {
    validHandle,
    validCreate,
    validUpdate,
    validId
} = require('../validators/bedtype.validator')

router.get('/', controller.getAll)
router.get('/:id', validId, validHandle, controller.getById)
router.post('/', validCreate, validHandle, controller.create)
router.put('/:id', validUpdate, validHandle, controller.update)
router.delete('/:id', validId, validHandle, controller.remove)

module.exports = router