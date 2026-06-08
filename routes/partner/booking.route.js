'use strict';
const express = require('express');
const router = express.Router();

const controller = require('../../controllers/partner/booking.controller');

// Partner chỉ READ booking 


router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/hotels/:hotelId/bookings', controller.getByHotel);

module.exports = router;