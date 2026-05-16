'use strict'
const { validationResult } = require('express-validator')
const { body } = require('express-validator')

const handleValidator = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'Thông tin không phù hợp',
            errors: error.array({ onlyFirstError: true }).map((e) => ({
                field: e.type === 'field' ? e.path : e.type,
                message: e.msg,
                value: e.type === 'field' ? e.value : undefined,
            })),
        });
    };
    next();
};

const validateCreateHotel = [


    body('hotelName')
        .trim()
        .notEmpty()
        .withMessage('Hotel name is required')
        .isLength({ min: 2, max: 255 })
        .withMessage('Hotel name must be between 2 and 255 characters'),

    body('description')
        .optional()
        .isLength({ max: 5000 })
        .withMessage('Description is too long'),

    body('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5'),

    body('cityId')
        .notEmpty()
        .withMessage('City ID is required')
        .isInt({ min: 1 })
        .withMessage('City ID must be a positive integer'),

    body('wardId')
        .notEmpty()
        .withMessage('Ward ID is required')
        .isInt({ min: 1 })
        .withMessage('Ward ID must be a positive integer'),

    body('address')
        .trim()
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ min: 5, max: 1000 })
        .withMessage('Address must be between 5 and 1000 characters'),

    body('status')
        .optional()
        .isIn(['ACTIVE', 'PENDING_STOP', 'STOPPED'])
        .withMessage('Invalid hotel status'),

    body('images')
        .optional()
        .isArray()
        .withMessage('Images must be an array'),

    body('images.*.imageUrl')
        .optional()
        .notEmpty()
        .withMessage('Image URL is required')
        .isString()
        .withMessage('Image URL must be a string'),

    body('images.*.isPrimary')
        .optional()
        .isBoolean()
        .withMessage('isPrimary must be boolean'),

    handleValidator
];

const validateUpdateHotel = [


    body('hotelName')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Hotel name is required')
        .isLength({ min: 2, max: 255 })
        .withMessage('Hotel name must be between 2 and 255 characters'),

    body('description')
        .optional()
        .isLength({ max: 5000 })
        .withMessage('Description is too long'),

    body('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5'),

    body('cityId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('City ID must be a positive integer'),

    body('wardId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Ward ID must be a positive integer'),

    body('address')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ min: 5, max: 1000 })
        .withMessage('Address must be between 5 and 1000 characters'),

    body('status')
        .optional()
        .isIn(['ACTIVE', 'PENDING_STOP', 'STOPPED'])
        .withMessage('Invalid hotel status'),

    body('images')
        .optional()
        .isArray()
        .withMessage('Images must be an array'),

    body('images.*.imageUrl')
        .optional()
        .notEmpty()
        .withMessage('Image URL is required')
        .isString()
        .withMessage('Image URL must be a string'),

    body('images.*.isPrimary')
        .optional()
        .isBoolean()
        .withMessage('isPrimary must be boolean'),

    handleValidator
];

module.exports = { handleValidator, validateCreateHotel, validateUpdateHotel }
