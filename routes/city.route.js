'use strict'
const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/authenticate');
const CityController = require('../controllers/city.controller')
const { validNameCity, validHandle } = require('../validators/city')

// GET all with active
router.get('/', CityController.getAllController)

// GET city by id with active
router.get('/:id', CityController.getByIdController)
// ---admin---

//get all
router.get('/', CityController.getAllController)

// CREATE 
router.post(
    '/',
    authenticate('Admin'),
    validNameCity,
    CityController.createController
)

// UPDATE city
router.put(
    '/:id',
    authenticate('Admin'),
    validNameCity,
    CityController.updateController
)

// DELETE city (soft/hard tùy bạn)
router.delete('/:id',
    authenticate('Admin'),
    CityController.removeController)

module.exports = router