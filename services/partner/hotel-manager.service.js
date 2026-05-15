'use strict';
const db = require('../../models');
const AppError = require('../../utils/appError');
const { where, Op } = require('sequelize');

/**
 * @param {any} reqUser
 * @returns {{ partnerId: number }}
 */
const partnerScope = (reqUser) => {
    return ({ partnerId: reqUser.id })
}

const getAll = async ({ reqUser, filters = {} }) => {
    /** @type {{ hotelName?: string, cityId?: number, status?: string }} */
    const typedFilters = filters;
    const where = partnerScope(reqUser);


    if (typedFilters.hotelName) {
        where['hotelName'] = { [Op.iLike]: `%${typedFilters.hotelName}%` };
    }
    if (typedFilters.cityId) {
        where['cityId'] = typedFilters.cityId;
    }
    if (typedFilters.status) {
        where['status'] = typedFilters.status;
    }

    return await db.Hotel.findAll({
        where,
        order: [['id', 'DESC']],
        include: [
            { model: db.User, as: 'partner', attributes: ['id', 'fullName', 'email'] },
        ],
    });
};

const getById = async ({ id, reqUser }) => {
    const where = { id, ...partnerScope(reqUser) };
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


const create = async ({ reqUser, hotelName, address, wardId, cityId, description, starRating }) => {
    const hotel = await db.Hotel.create({
        hotelName,
        address,
        wardId,
        cityId,
        description,
        starRating,
        status: 'PENDING',     
        partnerId: reqUser.id,  
    });

    return hotel;
};

const PARTNER_READONLY_FIELDS = ['status', 'partnerId'];

const update = async ({ id, reqUser, ...fields }) => {
    const where = { id, ...partnerScope(reqUser) };

    const hotel = await db.Hotel.findOne({ where });
    if (!hotel) throw new AppError('Không tìm thấy khách sạn hoặc bạn không có quyền', 404);

    const allowedFields = { ...fields };
    PARTNER_READONLY_FIELDS.forEach((f) => delete allowedFields[f]);

    await hotel.update(allowedFields);
    return hotel;
};

const remove = async ({ id, reqUser }) => {
    const where = { id, ...partnerScope(reqUser) };

    const hotel = await db.Hotel.findOne({ where });
    if (!hotel) throw new AppError('Không tìm thấy khách sạn hoặc bạn không có quyền', 404);

    await hotel.update({ deletedAt: new Date(), status: 'INACTIVE' });
    return { message: 'Xóa khách sạn thành công' };
};

const assignStaff = async ({ hotelId, staffId, reqUser }) => {
    const hotel = await db.Hotel.findOne({
        where: { id: hotelId, ...partnerScope(reqUser) },
    });
    if (!hotel) throw new AppError('Không tìm thấy khách sạn hoặc bạn không có quyền', 404);

    const staff = await db.User.findOne({ where: { id: staffId, role: 'Staff' } });
    if (!staff) throw new AppError('Không tìm thấy nhân viên', 404);

    await staff.update({ hotelId });
    return { message: 'Gán nhân viên vào khách sạn thành công' };
};


module.exports = { getAll, getById, create, update, assignStaff, remove };