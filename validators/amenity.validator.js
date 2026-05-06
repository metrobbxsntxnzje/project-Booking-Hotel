'use strict'
const { body, param, validationResult } = require('express-validator')

const validHandle = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Dữ liệu không hợp lệ',
            errors: errors.array({ onlyFirstError: true }).map((e) => ({
                field: e.type === 'field' ? e.path : null,
                message: e.msg
            }))
        })
    }

    next()
}

const validCreate = [
    body('name')
        .trim()
        .notEmpty().withMessage('Tên không được trống')
        .isLength({ min: 2 }).withMessage('Ít nhất 2 ký tự'),

    body('icon')
        .optional()
        .isString().withMessage('Icon phải là string')
]

const validUpdate = [
    param('id').isInt(),

    body('name')
        .optional()
        .trim()
        .notEmpty()
        .isLength({ min: 2 }),

    body('icon')
        .optional()
        .isString()
]

const validId = [
    param('id').isInt()
]

module.exports = {
    validHandle,
    validCreate,
    validUpdate,
    validId
}