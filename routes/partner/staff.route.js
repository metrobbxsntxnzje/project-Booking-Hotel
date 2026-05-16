'use strict'
const express = require('express')
const router = express.Router()

const controller = require('../../controllers/partner/staff.controller')

router.get('/', controller.getAllController)
router.get('/:id', controller.getByIdController)
router.post('/', controller.createController)
router.put('/:id', controller.updateController)
router.delete('/:id', controller.removeController)

module.exports = router
