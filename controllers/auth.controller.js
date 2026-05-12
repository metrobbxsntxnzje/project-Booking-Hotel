'use strict';
const AuthService = require('../services/auth.service');

const handleError = (res, error) => {

    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message || 'lỗi hệ thống' })

}
const registerController = async (req, res) => {
    try {
        const user = await AuthService.Register(req.body);
        return res.status(201).json(
            {
                message: 'Đăng ký thành công',
                success: 'true',
                user
            });
    }
    catch (error) {
        return handleError(res, error)
    }
}
const loginController = async (req, res) => {
    try {
        const { accessToken, refreshToken, user } = await AuthService.Login(req.body);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.status(201).json({
            message: ' Đăng nhập thành công',
            accessToken,
            success: 'true',
            user
        })
    }
    catch (error) {
        return handleError(res, error)
    }
}

module.exports = { loginController, registerController }