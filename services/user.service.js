'use strict'
const db = require('../models');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError')
const { Op } = require('sequelize');
const SALT_ROUNDS = 10;

const getScope = async (reqUser) => {
    switch (reqUser.role) {
        case 'Admin':
            return {}
        case 'Partner':
        case 'Partner':
            return {
                hotel_id: reqUser.hotel_id,
                role: {
                    [Op.in]: ['Staff', 'Customer']
                }
            };
        case 'Staff':
            return { hotel_id: reqUser.hotel_id };
        default:
            return { id: reqUser.id };
    }
}
const getAll = async ({ reqUser }) => {
    const where = getScope(reqUser);
    return await db.User.findAll({
        where,
        order: [['id', 'DESC']]
    })
}
const getById = async ({ id, reqUser }) => {
    const where = { id, ...getScope(reqUser) }
    const user = await db.User.findOne({ where });
    if (!user) {
        throw new AppError('Người dùng này không tồn tại', 404)
    }
    return user
}
const create = async ({ fullName, email, password, phone, gender, birthDate, role = 'Customer' }) => {
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
        role
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

    const update = async ({ id, requestingUser, ...fields }) => {
        const where = { id, ...getScope(requestingUser) };
        const user = await db.User.findOne({ where });
        if (!user) {
            throw new AppError(
                'Không tìm thấy người dùng hoặc không có quyền',
                404
            );
        }
        const allowedFields = { ...fields };
        if (requestingUser.role !== 'Admin') {
            delete allowedFields.role;
            delete allowedFields.status;
            delete allowedFields.hotel_id;
            delete allowedFields.password;
        }

        await user.update(
            allowedFields
        );

        const { password, ...result } = user.toJSON();

        return result;
    };
    const remove = async ({ id, requestingUser }) => {
        if (requestingUser.role !== 'Admin') {
            throw new AppError('Bạn không có quyền xóa người dùng', 403);
        }
        const user = await db.User.findByPk(id);
        if (!user) throw new AppError('Không tìm thấy người dùng', 404);

        await user.update({ deletedAt: new Date() });
        return { message: 'Xóa người dùng thành công' };
    };
    module.exports = { getAll, getById, create, update, remove }