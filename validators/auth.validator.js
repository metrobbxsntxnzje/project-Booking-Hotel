'use strict'
const { validationResult } = require('express-validator')
const { body } = require('express-validator')
const handleValidator = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'Thong tin khong phu hop',
            errors: error.array().map((e) => ({ onlyFirstError: true })),
        });
    };
    next();
};

const validateRegister = [
    body('fullname')
        .trim()
        .notEmpty().withMessage('Họ tên không được trống')
        .isLength({ min: 2, max: 100 }).withMessage('Họ tên từ 2-100 ký tự'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không đúng định dạng')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số'),

    body('phone')
        .optional()
        .matches(/^(0|\+84)[0-9]{9}$/).withMessage('Số điện thoại không hợp lệ'),

    body('gender')
        .optional()
        .isIn(['male', 'female', 'other']).withMessage('Giới tính không hợp lệ'),

    body('birthDate')
        .optional()
        .isDate().withMessage('Ngày sinh không đúng định dạng (YYYY-MM-DD)'),

    handleValidator

]
const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không đúng định dạng')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số'),

    handleValidator
];

const changePassword = [
    body('currentPassword')
        .trim()
        .notEmpty().withMessage('Mật khẩu không được trống')
        .isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage("Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số")
        .custom((value, { req }) => {
            if (value == req.body.currentPassword) {
                throw new Error('Mật khẩu trùng với mật khẩu hiện tại');
            }
            return true;
        }),
    handleValidator
]

module.exports = { handleValidator, validateLogin, validateRegister }

