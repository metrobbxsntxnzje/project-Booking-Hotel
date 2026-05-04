'use strict'
const bcrypt = require('bcrypt');
const db = require('../models');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');
const SALT_ROUNDS =10;

const Register = async ({fullName, email, password, phone, gender, birthDate}) => {
    const existing = await db.User.findOne({where: {email}});
    if(existing)
    {
        const error = new Error('Email đã tồn tại');
        error.statusCode =409;
        throw  error; 
    }
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await db.User.create({fullName,
        email, 
        password: hashed,
		phone, gender, birthDate,
		status: 'ACTIVE',
		role: 'Customer',
    })
    const {password: _, ...result } = user.toJson();
    return result
    
}

const Login = async({email, password}) => {
    const user = await db.User.scope('withDeleted').findOne({where:{email}})
    if(!user){
        const error = new Error('Mật khẩu không tồn tại')
        error.statuscode = 401;
        throw  error;
    }
    if (user.deletedAt) {
		const error = new Error('Tài khoản đã bị xóa');
		error.statusCode = 403;
		throw error;
	}
 
	if (user.status === 'BLOCKED') {
		const error = new Error('Tài khoản đã bị khóa');
		error.statusCode = 403;
		throw error;
	}
 
	if (user.status === 'PENDING') {
		const error = new Error('Tài khoản chưa được kích hoạt');
		error.statusCode = 403;
		throw error;
	}
    
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		const error = new Error('Email hoặc mật khẩu không đúng');
		error.statusCode = 401;
		throw error;
	}
    const payload  = {id: user.id, email: user.email, role: user.role}
    const accessToken  = generateAccessToken(payload);
	const refreshToken = generateRefreshToken(payload);
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return { accessToken, refreshToken, user: userWithoutPassword };
}

module.exports = {Register , Login  }