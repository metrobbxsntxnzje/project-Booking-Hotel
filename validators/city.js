'use strict'
const { validationResult, body } = require('express-validator')

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
const validNameCity = [
    body(
        'name'
    )
        .trim()
        .notEmpty().withMessage('Tên không được trống')
        .isLength({ min: 2 }).withMessage('Ít nhất 2 ký tự')
        .matches(/^[\p{L}\s]+$/u).withMessage('Chỉ chứa chữ cái và khoảng trắng'),

    validHandle
]
module.exports = { validHandle, validNameCity }