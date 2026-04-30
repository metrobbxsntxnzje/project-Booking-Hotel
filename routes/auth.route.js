'use strict'
const express = require('express');
const router = express.Router();

const {register, login, refreshToken, logout, getMe, changePassword} = require('../controllers/auth.controller');
const {authenticate} = require('../middleware/authenticate');
const{validateRegister, validateLogin, validateChangePassword} = require('../validators/auth.validator')

//public
router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.post('/refresh-token', refreshToken)
router.post('/logout', logout)

//private
router.get('/me',                    authenticate, getMe);
router.patch('/change-password',     authenticate, validateChangePassword, changePassword);

module.exports = router;

