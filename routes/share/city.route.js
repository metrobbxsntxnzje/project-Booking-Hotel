'use strict'
const express = require('express')
const router = express.Router()
const CityController = require('../../controllers/share/city.controller')

router.get('/', CityController.getAllController);
router.get('/:id', CityController.getByIdController);


module.exports = router