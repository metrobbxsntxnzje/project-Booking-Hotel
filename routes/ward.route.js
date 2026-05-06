'use strict'
const express = require('express')
const router = express.Router()
const Validator = require('../validators/ward.validator')
const controller = require('../controllers/ward.controller')

// CRUD
router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/',
    Validator.validCreateWard,
    controller.create)
router.put('/:id',
    Validator.validUpdateWard,
    controller.update)
router.delete('/:id', controller.remove)

module.exports = router