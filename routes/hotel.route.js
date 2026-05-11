'use strict';
const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { authenticate, authorize } = require('../middleware/authenticate');


router.get('/', authenticate, hotelController.getAll);

router.get('/:id', authenticate, hotelController.getById);


router.post('/', authenticate, authorize('Admin', 'Partner'), hotelController.create);

// PUT /hotels/:id

router.put('/:id', authenticate, authorize('Admin', 'Partner'), hotelController.update);


router.patch('/:id/approve', authenticate, authorize('Admin'), hotelController.approve);



router.post('/:id/staff', authenticate, authorize('Admin', 'Partner'), hotelController.assignStaff);


router.delete('/:id', authenticate, authorize('Admin'), hotelController.remove);

module.exports = router;