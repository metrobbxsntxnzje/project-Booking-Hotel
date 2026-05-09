'use strict';

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

const {
    authenticate,
    authorize,
} = require('../middleware/authenticate');

const {
    validateCreateUser,
    validateUpdateUser,
    validateUserId,
} = require('../validators/user.validator');

// user
router.get('/me',
    authenticate,
    userController.getMeController
)
router.put('/me',
    authenticate,
    validateUpdateUser,
    userController.updateMeController
)
// admin
router.get('/',
    authenticate,
    authorize('Admin'),
    userController.getAllController
)
router.post(
    '/',
    authenticate,
    authorize('Admin'),
    validateCreateUser,
    validateUserId,
    userController.createController
);
router.put(
    '/:id',
    authenticate,
    authorize('Admin'),
    validateUpdateUser,
    validateUserId,
    userController.updateController
);

// Xóa user
router.delete(
    '/:id',
    authenticate,
    authorize('Admin'),
    validateUserId,
    userController.removeController
);
module.exports = router;