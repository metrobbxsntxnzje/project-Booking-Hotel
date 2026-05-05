'use strict'
const express = require('express')
const router = express.Router()

const CityController = require('../controllers/city.controller')
const { validNameCity, validHandle } = require('../validators/city')

// GET all cities
router.get('/', CityController.getAllController)

// GET city by id
router.get('/:id', CityController.getByIdController)

// CREATE city
router.post(
    '/',
    validNameCity,
    validHandle,
    CityController.createController
)

// UPDATE city
router.put(
    '/:id',
    validNameCity,
    validHandle,
    CityController.updateController
)

// DELETE city (soft/hard tùy bạn)
router.delete('/:id', CityController.removeController)

module.exports = router