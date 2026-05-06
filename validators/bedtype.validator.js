'use strict'
const { body, param, validationResult } = require('express-validator')

const validHandle = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Dữ liệu không hợp lệ',
            errors: errors.array().map(e => ({
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

    body('maxPeople')
        .notEmpty().withMessage('maxPeople bắt buộc')
        .isInt({ gt: 0 }).withMessage('maxPeople phải > 0')
]

const validUpdate = [
    param('id').isInt(),

    body('name')
        .optional()
        .trim()
        .notEmpty()
        .isLength({ min: 2 }),

    body('maxPeople')
        .optional()
        .isInt({ gt: 0 })
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