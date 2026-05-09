'use strict';
const db = require('../models');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');
const { Op } = require('sequelize');
const SALT_ROUNDS = 10;

// Bỏ async — không có gì cần await bên trong
const getScope = (reqUser) => {
    switch (reqUser.role) {
        case 'Admin':
            return {};
        case 'Partner':
            return {
                hotel_id: reqUser.hotel_id,
                role: { [Op.in]: ['Staff', 'Customer'] },
            };
        case 'Staff':
            return { hotel_id: reqUser.hotel_id };
        default:
            return null;
    }
};

const getAll = async ({ reqUser }) => {
    const scope = getScope(reqUser);
    if (scope === null) throw new AppError('Bạn không có quyền', 403);

    return await db.User.findAll({
        where: scope,
        order: [['id', 'DESC']],
    });
};

const getById = async ({ id, reqUser }) => {
    const scope = getScope(reqUser);

    const where = scope === null
        ? { id: reqUser.id }
        : { id, ...scope };

    const user = await db.User.findOne({ where });
    if (!user) throw new AppError('Người dùng không tồn tại hoặc bạn không có quyền', 404);
    return user;
};

const create = async ({ fullName, email, password, phone, gender, birthDate, role = 'Customer', status = 'ACTIVE' }) => {
    const existing = await db.User.findOne({ where: { email } });
    if (existing) throw new AppError('Email này đã tồn tại', 409);

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await db.User.create({
        fullName, email, password: hashed,
        phone, gender, birthDate,
        status, role,
    });

    const { password: _, ...result } = user.toJSON();
    return result;
};

const PROTECTED_FIELDS = ['role', 'status', 'hotel_id', 'password'];

const update = async ({ id, reqUser, ...fields }) => {
    const scope = getScope(reqUser);
    const where = scope === null
        ? { id: reqUser.id }  // Customer chỉ update chính mình
        : { id, ...scope };

    const user = await db.User.findOne({ where });
    if (!user) throw new AppError('Không tìm thấy người dùng hoặc không có quyền', 404);

    const allowedFields = { ...fields };
    if (reqUser.role !== 'Admin') {
        PROTECTED_FIELDS.forEach(f => delete allowedFields[f]);
    }

    await user.update(allowedFields);
    const { password, ...result } = user.toJSON();
    return result;
};

const remove = async ({ id, reqUser }) => {
    const user = await db.User.findByPk(id);
    if (!user) throw new AppError('Không tìm thấy người dùng', 404);

    await user.update({ deletedAt: new Date() });
    return { message: 'Xóa người dùng thành công' };
};

module.exports = { getAll, getById, create, update, remove };