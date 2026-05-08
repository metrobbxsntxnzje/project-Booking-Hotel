'use strict'
const db = require('../models');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError')
const SALT_ROUNDS = 10;
const getAll = async () => {

    return await db.User.findAll({
        order: [['id', 'DESC']]
    })
}
const getById = async ({ id }) => {
    const user = await db.User.findByPk(id);
    if (!user) {
        throw new AppError('Người dùng này không tồn tại', 404)
    }
    return user
}
const create = async ({ fullName, email, password, phone, gender, birthDate }) => {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const existing = await db.User.findOne({ where: { email } })
    if (existing) {
        throw new AppError('Email này đã tồn tại', 409)
    }
    const user = await db.User.create({
        fullName,
        email,
        password: hashed,
        phone,
        gender,
        birthDate,
        status: 'ACTIVE',
        role: 'Customer'
    })
    const { password: _, ...result } = user.toJSON();
    return result
}
const update = async ({
    id,
    fullName,
    phone,
    gender,
    birthDate,
    address,
    cityId,
    wardId,
    avatarUrl,
}) => {

    const user = await db.User.findByPk(id);

    if (!user) {
        throw new AppError(
            'Không tìm thấy người dùng',
            404
        );
    }

    await user.update({
        fullName,
        phone,
        gender,
        birthDate,
        address,
        cityId,
        wardId,
        avatarUrl,
    });

    const { password, ...result } = user.toJSON();

    return result;
};
const remove = async ({ id }) => {

    const user = await db.User.findByPk(id);

    if (!user) {
        throw new AppError(
            'Không tìm thấy người dùng',
            404
        );
    }

    await user.update({
        deletedAt: new Date(),
    });

    return {
        message: 'Xóa người dùng thành công',
    };
};
module.exports = { getAll, getById, create, update, remove }