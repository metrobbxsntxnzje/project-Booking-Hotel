'use strict';
const db = require('../models');
const AppError = require('../utils/appError');
const { Op } = require('sequelize');

const getScope = (reqUser) => {
    switch (reqUser.role) {
        case 'Admin':
            return {};
        case 'Partner':
            return { partner_id: reqUser.id };
        case 'Staff':
            return { id: reqUser.hotel_id };
        case 'User':
            return { status: 'ACTIVE' };
        default:
            return null;
    }
};

const getAll = async ({ reqUser, filters = {} }) => {
    const scope = getScope(reqUser);
    if (scope === null) throw new AppError('Bạn không có quyền truy cập', 403);

    const where = { ...scope };

    // // Cho phép filter thêm theo tên, thành phố
    // if (filters.name) where.name = { [Op.like]: `%${filters.name}%` };
    // if (filters.city) where.city = { [Op.like]: `%${filters.city}%` };
    // if (filters.status && reqUser.role === 'Admin') where.status = filters.status;

    return await db.Hotel.findAll({
        where,
        order: [['id', 'DESC']],
        include: [
            { model: db.User, as: 'partner', attributes: ['id', 'fullName', 'email'] },
        ],
    });
};

const getById = async ({ id, reqUser }) => {
    const scope = getScope(reqUser);
    if (scope === null) throw new AppError('Bạn không có quyền truy cập', 403);

    const where = { id, ...scope };

    const hotel = await db.Hotel.findOne({
        where,
        include: [
            { model: db.User, as: 'partner', attributes: ['id', 'fullName', 'email'] },
            { model: db.Room, as: 'rooms', required: false },
        ],
    });

    if (!hotel) throw new AppError('Khách sạn không tồn tại hoặc bạn không có quyền', 404);
    return hotel;
};


const create = async ({ reqUser, partnerId, hotelName, address, wardId, cityId, description, starRating, status = 'ACTIVE', }) => {
    if (!['Admin', 'Partner'].includes(reqUser.role)) {
        throw new AppError('Chỉ Admin hoặc Partner mới có thể tạo khách sạn', 403);
    }

    const finalStatus = reqUser.role === 'Partner' ? 'PENDING_STOP' : status;
    const partner_id = reqUser.role === 'Partner' ? reqUser.id : partnerId;
    console.log(partner_id)


    const hotel = await db.Hotel.create({
        hotelName, address, cityId, wardId,
        description,
        starRating, status: finalStatus,
        partnerId: partner_id,
    });

    return hotel;
};


const PROTECTED_FIELDS = ['status', 'partner_id'];

const update = async ({ id, reqUser, ...fields }) => {
    if (!['Admin', 'Partner'].includes(reqUser.role)) {
        throw new AppError('Bạn không có quyền cập nhật khách sạn', 403);
    }

    const scope = getScope(reqUser);
    const where = { id, ...scope };

    const hotel = await db.Hotel.findOne({ where });
    if (!hotel) throw new AppError('Không tìm thấy khách sạn hoặc bạn không có quyền', 404);

    const allowedFields = { ...fields };
    if (reqUser.role !== 'Admin') {
        PROTECTED_FIELDS.forEach(f => delete allowedFields[f]);
    }

    await hotel.update(allowedFields);
    return hotel;
};

const approve = async ({ id, reqUser, status }) => {
    if (reqUser.role !== 'Admin') {
        throw new AppError('Chỉ Admin mới có thể duyệt khách sạn', 403);
    }

    if (!['ACTIVE', 'REJECTED'].includes(status)) {
        throw new AppError('Trạng thái không hợp lệ. Chỉ chấp nhận ACTIVE hoặc REJECTED', 400);
    }

    const hotel = await db.Hotel.findByPk(id);
    if (!hotel) throw new AppError('Không tìm thấy khách sạn', 404);

    if (hotel.status !== 'PENDING') {
        throw new AppError('Chỉ có thể duyệt khách sạn đang ở trạng thái PENDING', 400);
    }

    await hotel.update({ status });
    return {
        message: status === 'ACTIVE'
            ? 'Khách sạn đã được duyệt thành công'
            : 'Khách sạn đã bị từ chối',
        hotel,
    };
};


const assignStaff = async ({ hotelId, staffId, reqUser }) => {
    if (!['Admin', 'Partner'].includes(reqUser.role)) {
        throw new AppError('Bạn không có quyền thực hiện thao tác này', 403);
    }

    const scope = getScope(reqUser);
    const hotel = await db.Hotel.findOne({ where: { id: hotelId, ...scope } });
    if (!hotel) throw new AppError('Không tìm thấy khách sạn hoặc bạn không có quyền', 404);

    const staff = await db.User.findOne({
        where: { id: staffId, role: 'Staff' },
    });
    if (!staff) throw new AppError('Không tìm thấy nhân viên', 404);

    await staff.update({ hotel_id: hotelId });
    return { message: 'Gán nhân viên vào khách sạn thành công' };
};


const remove = async ({ id, reqUser }) => {
    if (reqUser.role !== 'Admin') {
        throw new AppError('Chỉ Admin mới có thể xóa khách sạn', 403);
    }

    const hotel = await db.Hotel.findByPk(id);
    if (!hotel) throw new AppError('Không tìm thấy khách sạn', 404);

    await hotel.update({ deletedAt: new Date(), status: 'INACTIVE' });
    return { message: 'Xóa khách sạn thành công' };
};

module.exports = { getAll, getById, create, update, approve, assignStaff, remove };