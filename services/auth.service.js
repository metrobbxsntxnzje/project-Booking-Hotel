'use strict'
const bcrypt = require('bcrypt');
const db = require('../models');
const AppError = require('../utils/appError')
const { generateAccessToken, generateRefreshToken } = require('../utils/token');
const SALT_ROUNDS = 10;

const Register = async ({ fullName, email, password, phone, gender, birthDate }) => {
    const existing = await db.User.findOne({ where: { email } });
    if (existing) {

        throw new AppError('Email đã tồn tại', 409);
    }
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await db.User.create({
        fullName,
        email,
        password: hashed,
        phone, gender, birthDate,
        status: 'ACTIVE',
        role: 'Customer',
    })
    const { password: _, ...result } = user.toJSON();
    return result

}

const Login = async ({ email, password }) => {
    const user = await db.User.scope('withDeleted').findOne({ where: { email } })
    if (!user) {
        throw new AppError('Mật khẩu không tồn tại', 401);

    }
    if (user.deletedAt) {
        throw new AppError('Mật khẩu đã bị xóa', 403);

    }

    if (user.status === 'BLOCKED') {

        throw new AppError('Tài khoản đã bị khóa', 403);
    }

    if (user.status === 'PENDING') {
        throw new AppError('Tài khoản chưa kích hoạt', 403);

    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError('Email hoặc mật khẩu không đúng', 401);

    }
    const payload = { id: user.id, email: user.email, role: user.role }
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return { accessToken, refreshToken, user: userWithoutPassword };
}

module.exports = { Register, Login }