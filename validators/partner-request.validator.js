'use strict';
const { validationResult, body } = require('express-validator');

const validHandle = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'Thông tin không phù hợp',
            errors: error.array({ onlyFirstError: true }).map((e) => ({
                field: e.type === 'field' ? e.path : null,
                message: e.msg,
            })),
        });
    }
    next();
};

// ── Validate khi Customer gửi yêu cầu đăng ký Partner ────────────────────────
const validateRegisterPartner = [
    body('companyName')
        .trim()
        .notEmpty().withMessage('Tên công ty không được trống')
        .isLength({ min: 2, max: 255 }).withMessage('Tên công ty từ 2 đến 255 ký tự'),

    body('taxCode')
        .trim()
        .notEmpty().withMessage('Mã số thuế không được trống')
        .matches(/^\d{10}(\d{3})?$/).withMessage('Mã số thuế phải có 10 hoặc 13 chữ số'),

    body('businessLicense')
        .trim()
        .notEmpty().withMessage('Giấy phép kinh doanh không được trống'),

    validHandle,
];

// ── Validate khi Admin duyệt / từ chối ───────────────────────────────────────
const validateReviewRequest = [
    body('status')
        .notEmpty().withMessage('Trạng thái không được trống')
        .isIn(['APPROVED', 'REJECTED']).withMessage('Trạng thái chỉ chấp nhận APPROVED hoặc REJECTED'),

    body('adminNote')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Ghi chú không được vượt quá 500 ký tự'),

    validHandle,
];

module.exports = { validateRegisterPartner, validateReviewRequest };