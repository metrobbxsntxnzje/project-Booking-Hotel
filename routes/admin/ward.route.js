'use strict'
const express = require('express')
const router = express.Router()
const Validator = require('../../validators/ward.validator')
const controller = require('../../controllers/admin/ward.controller')
const { authenticate, authorize } = require('../../middleware/authenticate');
const { validNameCity, validHandle } = require('../../validators/city')
// CRUD
router.get('/', authenticate, authorize('Admin'), controller.getAllController)
router.get('/:id', authenticate, authorize('Admin'), controller.getByIdController)
router.post('/',
    Validator.validCreateWard,
    controller.createController)
router.put('/:id', authenticate, authorize('Admin'),
    Validator.validUpdateWard,
    controller.updateController)
router.delete('/:id', authenticate, authorize('Admin'), controller.removeController)

module.exports = router