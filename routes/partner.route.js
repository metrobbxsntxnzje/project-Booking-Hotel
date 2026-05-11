'use strict';
const express = require('express');
const router = express.Router();
const partnerRequestController = require('../controllers/partner-request.controller');
const { authenticate, authorize } = require('../middleware/authenticate');
const { validateRegisterPartner, validateReviewRequest } = require('../validators/partner-request.validator');


// Customer gửi yêu cầu trở thành Partner
router.post(
    '/',
    authenticate,
    authorize('Customer'),
    validateRegisterPartner,
    partnerRequestController.registerPartner
);

// Customer xem trạng thái yêu cầu của mình
router.get(
    '/me',
    authenticate,
    authorize('Customer'),
    partnerRequestController.getMyRequest
);

// Admin xem toàn bộ danh sách (có thể filter ?status=PENDING)
router.get(
    '/',
    authenticate,
    authorize('Admin'),
    partnerRequestController.getAllRequests
);

// Admin duyệt hoặc từ chối
router.patch(
    '/:id/review',
    authenticate,
    authorize('Admin'),
    validateReviewRequest,
    partnerRequestController.reviewRequest
);

module.exports = router;