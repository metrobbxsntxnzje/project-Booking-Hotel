'use strict';
const AuthService = require('../services/auth.service');

const handleError=(res, error) => {
  
        const status = error.statusCode || 500;
        return res.status(status).json({message:error.message || 'lỗi hệ thống'})
    
}
const register =async(req, res) => {
    try{
        const user = await AuthService.Register(req.body);
    return res.status(201).json({message:'Đăng ký thành công', user});
    }
    catch(error){
        return handleError(res,error)
    }
}
const login = async (req, res) => {
    try {
        const { accessToken, refreshToken, user } = await AuthService.Login(req.body);
        res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
        return res.status(201).json({message:' Đăng nhập thành công',accessToken,user})
    }
    catch(error){
        return handleError(res,error)
    }
}