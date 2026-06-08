'use strict';
const express = require('express');
const router = express.Router({ mergeParams: true })
const controller = require('../../controllers/partner/room.controller');
const { validateCreateRoomConfig, validateUpdateRoomConfig } = require('../../validators/room.validator');

// --- Room Configuration ---
router.get('/configs', controller.getAllConfigs);
router.get('/configs/:id', controller.getConfigById);
router.post('/configs', validateCreateRoomConfig, controller.createConfig);
router.put('/configs/:id', validateUpdateRoomConfig, controller.updateConfig);
router.delete('/configs/:id', controller.removeConfig);

// --- Room Images ---


router.post('/configs/:configId/images', controller.uploadImages);
router.delete('/configs/:configId/images/:imageId', controller.removeImage);
router.put('/configs/:configId/images/:imageId/set-primary', controller.setPrimaryImage);

// --- Physical Rooms ---

router.get('/configs/:configId/physical-rooms', controller.getAllPhysicalRooms);
router.post('/configs/:configId/physical-rooms', controller.createPhysicalRoom);
router.put('/physical-rooms/:id', controller.updatePhysicalRoom);
router.delete('/physical-rooms/:id', controller.removePhysicalRoom);

module.exports = router;