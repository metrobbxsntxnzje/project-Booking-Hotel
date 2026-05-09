'use strict';

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middleware/authenticate');
const {
    validateCreateUser,
    validateUpdateUser,
    validateUserId,
} = require('../validators/user.validator');

// ── Tất cả role đã đăng nhập ───────────────────────────────────
router.get('/me',
    authenticate,
    userController.getMeController
);
router.put('/me',
    authenticate,
    validateUpdateUser,
    userController.updateMeController
);

// ── Admin only ─────────────────────────────────────────────────
router.get('/',
    authenticate,
    authorize('Admin'),
    userController.getAllController
);
router.post('/',
    authenticate,
    authorize('Admin'),
    validateCreateUser,
    userController.createController
);
router.delete('/:id',
    authenticate,
    authorize('Admin'),
    validateUserId,
    userController.removeController
);

// ── Admin + Partner + Staff (service tự scope) ─────────────────
router.get('/:id',
    authenticate,
    authorize('Admin', 'Partner', 'Staff'),
    validateUserId,
    userController.getByIdController
);
router.put('/:id',
    authenticate,
    authorize('Admin', 'Partner'),
    validateUpdateUser,
    validateUserId,
    userController.updateController
);

module.exports = router;