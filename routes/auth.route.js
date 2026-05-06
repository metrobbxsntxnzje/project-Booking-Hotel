'use strict'
const express = require('express');
const router = express.Router();

const AuthController= require('../controllers/auth.controller');
const {authenticate} = require('../middleware/authenticate');
const{validateRegister, validateLogin} = require('../validators/auth.validator')
const token = require('../utils/token')

//public
router.post('/register', validateRegister, AuthController.registerController)
router.post('/login', validateLogin, AuthController.loginController)
router.post('/refresh-token', token.verify)
// router.post('/logout', logout)

//private
router.get('/me',                    authenticate, getMe);
// router.patch('/change-password',     authenticate, validateChangePassword, changePassword);

module.exports = router;

