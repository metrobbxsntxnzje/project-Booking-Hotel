'use strict';

const { body, validationResult } = require('express-validator');

const handleValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Thông tin không phù hợp',
            errors: errors.array({ onlyFirstError: true }).map((error) => ({
                field: error.type === 'field' ? error.path : error.type,
                message: error.msg,
                value: error.type === 'field' ? error.value : undefined,
            })),
        });
    }

    next();
};

const validatePriceItem = [
    body('date')
        .notEmpty()
        .withMessage('date là bắt buộc')
        .isDate({ format: 'YYYY-MM-DD', strictMode: true })
        .withMessage('date không hợp lệ, định dạng đúng là YYYY-MM-DD'),

    body('price')
        .notEmpty()
        .withMessage('price là bắt buộc')
        .isFloat({ min: 0 })
        .withMessage('price phải là số lớn hơn hoặc bằng 0'),
];

const validatePrices = [
    body('prices')
        .isArray({ min: 1 })
        .withMessage('prices phải là mảng và phải có ít nhất 1 phần tử'),

    body('prices.*.date')
        .notEmpty()
        .withMessage('date là bắt buộc')
        .isDate({ format: 'YYYY-MM-DD', strictMode: true })
        .withMessage('date không hợp lệ, định dạng đúng là YYYY-MM-DD'),

    body('prices.*.price')
        .notEmpty()
        .withMessage('price là bắt buộc')
        .isFloat({ min: 0 })
        .withMessage('price phải là số lớn hơn hoặc bằng 0'),

    handleValidator,
];

const validateUpdatePrice = [
    body('date')
        .optional()
        .isDate({ format: 'YYYY-MM-DD', strictMode: true })
        .withMessage('date không hợp lệ, định dạng đúng là YYYY-MM-DD'),

    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('price phải là số lớn hơn hoặc bằng 0'),

    body()
        .custom((value) => {
            if (value.date === undefined && value.price === undefined) {
                throw new Error('Cần truyền ít nhất date hoặc price');
            }

            return true;
        }),

    handleValidator,
];

const validateInventory = [
    body('inventory')
        .isArray({ min: 1 })
        .withMessage('inventory phải là mảng và phải có ít nhất 1 phần tử'),

    body('inventory.*.date')
        .notEmpty()
        .withMessage('date là bắt buộc')
        .isDate({ format: 'YYYY-MM-DD', strictMode: true })
        .withMessage('date không hợp lệ, định dạng đúng là YYYY-MM-DD'),

    body('inventory.*.availableCount')
        .notEmpty()
        .withMessage('availableCount là bắt buộc')
        .isInt({ min: 0 })
        .withMessage('availableCount phải là số nguyên lớn hơn hoặc bằng 0'),

    handleValidator,
];

module.exports = {
    handleValidator,
    validatePriceItem,
    validatePrices,
    validateUpdatePrice,
    validateInventory,
};
