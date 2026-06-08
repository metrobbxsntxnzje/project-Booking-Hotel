'use strict';
const express = require('express');

const controller = require('../../controllers/partner/pricing.controller');
const { validatePrices, validateUpdatePrice, validateInventory } = require('../../validators/pricing.validator');
const router = express.Router({ mergeParams: true });

// --- Room Prices ---
router.get('/configs/:configId/prices', controller.getPrices);
router.post('/configs/:configId/prices', validatePrices, controller.setPrices);
router.put('/configs/:configId/prices/:id', validateUpdatePrice, controller.updatePrice);
router.delete('/configs/:configId/prices/:id', controller.removePrice);

// --- Room Inventory ---
router.get('/configs/:configId/inventory', controller.getInventory);
router.put('/configs/:configId/inventory', validateInventory, controller.updateInventory);

module.exports = router;
