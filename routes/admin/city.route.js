'use strict'
const express = require('express')
const router = express.Router()
const { authenticate, authorize } = require('../../middleware/authenticate');
const CityController = require('../../controllers/admin/city.controller')
const { validNameCity, validHandle } = require('../../validators/city')


//get all
router.get('/', authenticate,
    authorize('Admin'),
    CityController.getAllController)
router.get('/:id',
    authenticate,
    authorize('Admin'),
    CityController.getByIdController)


// CREATE 
router.post(
    '/',
    authenticate,
    authorize('Admin'),
    validNameCity,
    CityController.createController
)

// UPDATE city
router.put(
    '/:id',
    authenticate,
    authorize('Admin'),
    validNameCity,
    CityController.updateController
)

// DELETE city (soft/hard tùy bạn)
router.delete('/:id',
    authenticate,
    authorize('Admin'),
    CityController.removeController)

module.exports = router