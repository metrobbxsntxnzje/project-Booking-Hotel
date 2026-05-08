'use strict'
const { validationResult } = require('express-validator')
const { body, param } = require('express-validator')
const handleValidator = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'Thong tin khong phu hop',
            errors: error.array({ onlyFirstError: true }).map((e) => ({
                field: e.type === 'field' ? e.path : e.type,
                message: e.msg,
                value: e.type === 'field' ? e.value : undefined,
            })),
        });
    };
    next();
};

const validateCreateUser = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 2, max: 255 })
        .withMessage('Full name must be between 2 and 255 characters'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    body('phone')
        .optional()
        .trim()
        .isLength({ min: 9, max: 20 })
        .withMessage('Phone number must be between 9 and 20 characters'),

    body('status')
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['ACTIVE', 'PENDING', 'BLOCKED'])
        .withMessage('Invalid status value'),

    body('address')
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage('Address must not exceed 255 characters'),

    body('gender')
        .optional()
        .trim()
        .isIn(['Male', 'Female', 'Other'])
        .withMessage('Invalid gender value'),

    body('birthDate')
        .optional()
        .isDate()
        .withMessage('Birth date must be a valid date'),

    body('avatarUrl')
        .optional()
        .trim()
        .isURL()
        .withMessage('Avatar URL must be valid'),

    body('cityId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('City ID must be a positive integer'),

    body('wardId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Ward ID must be a positive integer'),

    body('role')
        .optional()
        .isIn(['Admin', 'Customer', 'Partner', 'Staff'])
        .withMessage('Invalid role value'),

    handleValidator,
];

const validateUpdateUser = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('User ID must be a positive integer'),

    body('fullName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 255 })
        .withMessage('Full name must be between 2 and 255 characters'),

    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .optional()
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    body('phone')
        .optional()
        .trim()
        .isLength({ min: 9, max: 20 })
        .withMessage('Phone number must be between 9 and 20 characters'),

    body('status')
        .optional()
        .isIn(['ACTIVE', 'PENDING', 'BLOCKED'])
        .withMessage('Invalid status value'),

    body('address')
        .optional()
        .trim()
        .isLength({ max: 255 })
        .withMessage('Address must not exceed 255 characters'),

    body('gender')
        .optional()
        .trim()
        .isIn(['Male', 'Female', 'Other'])
        .withMessage('Invalid gender value'),

    body('birthDate')
        .optional()
        .isDate()
        .withMessage('Birth date must be a valid date'),

    body('avatarUrl')
        .optional()
        .trim()
        .isURL()
        .withMessage('Avatar URL must be valid'),

    body('cityId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('City ID must be a positive integer'),

    body('wardId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Ward ID must be a positive integer'),

    body('role')
        .optional()
        .isIn(['Admin', 'Customer', 'Partner', 'Staff'])
        .withMessage('Invalid role value'),

    handleValidator,
];

const validateUserId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('User ID must be a positive integer'),

    handleValidator,
];

module.exports = {
    validateCreateUser,
    validateUpdateUser,
    validateUserId,
};