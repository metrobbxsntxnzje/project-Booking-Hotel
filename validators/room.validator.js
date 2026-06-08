'use strict';
const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
    }
    next();
};

// --- Room Configuration ---

const validateCreateRoomConfig = [
    body('roomTypeId').isInt({ min: 1 }).withMessage('roomTypeId không hợp lệ'),
    body('basePrice').isFloat({ min: 0 }).withMessage('basePrice phải là số dương'),
    body('area').optional().isInt({ min: 1 }).withMessage('area phải là số nguyên dương'),
    body('maxPeople').optional().isInt({ min: 1 }).withMessage('maxPeople phải là số nguyên dương'),
    body('amenityIds').optional().isArray().withMessage('amenityIds phải là mảng'),
    body('amenityIds.*').optional().isInt({ min: 1 }).withMessage('amenityId không hợp lệ'),
    body('bedTypes').optional().isArray().withMessage('bedTypes phải là mảng'),
    body('bedTypes.*.bedTypeId').isInt({ min: 1 }).withMessage('bedTypeId không hợp lệ'),
    body('bedTypes.*.quantity').isInt({ min: 1 }).withMessage('quantity phải >= 1'),
    handleValidation
];

const validateUpdateRoomConfig = [
    body('basePrice').optional().isFloat({ min: 0 }).withMessage('basePrice phải là số dương'),
    body('area').optional().isInt({ min: 1 }).withMessage('area phải là số nguyên dương'),
    body('maxPeople').optional().isInt({ min: 1 }).withMessage('maxPeople phải là số nguyên dương'),
    body('amenityIds').optional().isArray().withMessage('amenityIds phải là mảng'),
    body('amenityIds.*').optional().isInt({ min: 1 }).withMessage('amenityId không hợp lệ'),
    body('bedTypes').optional().isArray().withMessage('bedTypes phải là mảng'),
    body('bedTypes.*.bedTypeId').isInt({ min: 1 }).withMessage('bedTypeId không hợp lệ'),
    body('bedTypes.*.quantity').isInt({ min: 1 }).withMessage('quantity phải >= 1'),
    handleValidation
];

// --- Pricing ---

const validatePrices = [
    body('prices').isArray({ min: 1 }).withMessage('prices phải là mảng và không rỗng'),
    body('prices.*.date').isDate().withMessage('date không hợp lệ (YYYY-MM-DD)'),
    body('prices.*.price').isFloat({ min: 0 }).withMessage('price phải là số dương'),
    handleValidation
];

// --- Inventory ---

const validateInventory = [
    body('inventory').isArray({ min: 1 }).withMessage('inventory phải là mảng và không rỗng'),
    body('inventory.*.date').isDate().withMessage('date không hợp lệ (YYYY-MM-DD)'),
    body('inventory.*.availableCount').isInt({ min: 0 }).withMessage('availableCount phải >= 0'),
    handleValidation
];

module.exports = { validateCreateRoomConfig, validateUpdateRoomConfig, validatePrices, validateInventory };