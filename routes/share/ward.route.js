'use strict'
const express = require('express')
const router = express.Router()
const Validator = require('../../validators/ward.validator')
const controller = require('../../controllers/share/ward.controller')

// CRUD
router.get('/', controller.getAllController)
router.get('/:id', controller.getByIdController)


module.exports = router