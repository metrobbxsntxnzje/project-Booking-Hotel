'use strict'
const { validationResult, body, param } = require('express-validator')

const validHandle = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: "Thông tin không phù hợp",
            errors: error.array({ onlyFirstError: true }).map((e) => ({
                field: e.type === 'field' ? e.path : null,
                message: e.msg
            }))
        })
    }
    next()
}
const validCreateWard = [
    body('name')
        .trim()
        .notEmpty().withMessage('Tên phường không được để trống')
        .isLength({ min: 2 }).withMessage('Ít nhất 2 ký tự'),

    body('cityId')
        .notEmpty().withMessage('cityId là bắt buộc')
        .isInt({ gt: 0 }).withMessage('cityId phải là số nguyên > 0')
]
const validUpdateWard = [
    param('id')
        .isInt({ gt: 0 }).withMessage('ID không hợp lệ'),

    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Tên không được rỗng')
        .isLength({ min: 2 }).withMessage('Ít nhất 2 ký tự'),

    body('cityId')
        .optional()
        .isInt({ gt: 0 }).withMessage('cityId phải là số nguyên > 0')
]
module.exports = { validHandle, validCreateWard, validUpdateWard }