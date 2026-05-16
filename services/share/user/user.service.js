'use strict';
const db = require('../../../models');
const bcrypt = require('bcrypt');
const AppError = require('../../../utils/appError');
const { Op } = require('sequelize');
const SALT_ROUNDS = 10;

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


// ── Customer gửi đăng ký làm Partner ──────────────────────────────────────────
const registerPartner = async ({ reqUser, companyName, taxCode, businessLicense }) => {
    if (reqUser.role !== 'Customer') {
        throw new AppError('Chỉ Customer mới có thể gửi yêu cầu trở thành Partner', 403);
    }

    // Đã là Partner chưa
    const existedPartner = await db.Partner.findOne({ where: { userId: reqUser.id } });
    if (existedPartner) {
        throw new AppError('Bạn đã là Partner', 409);
    }

    // Đang có request PENDING chưa
    const existedRequest = await db.PartnerRequest.findOne({
        where: { userId: reqUser.id, status: 'PENDING' },
    });
    if (existedRequest) {
        throw new AppError('Bạn đang có yêu cầu chờ duyệt, vui lòng đợi Admin xét duyệt', 409);
    }

    const request = await db.PartnerRequest.create({
        userId: reqUser.id,
        companyName,
        taxCode,
        businessLicense,
        status: 'PENDING',
    });

    return request;
};


// ── Customer xem trạng thái request của mình ──────────────────────────────────
const getMyRequest = async ({ reqUser }) => {
    const request = await db.PartnerRequest.findOne({
        where: { userId: reqUser.id },
        order: [['createdAt', 'DESC']],
    });

    if (!request) throw new AppError('Bạn chưa gửi yêu cầu nào', 404);
    return request;
};


module.exports = { getAll, getById, create, update, remove, registerPartner, getMyRequest };