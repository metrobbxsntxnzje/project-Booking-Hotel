'use strict';
const { options } = require('../..');
const db = require('../../models');
const partner = require('../../models/partner');
const AppError = require('../../utils/appError');
const { Op } = require('sequelize');

const verifyHotelOwnership = async (reqUser, hotelId,) =>{
    const hotel = await db.Hotel.findOne({
        where: {
            id: hotelId,
            partnerId: reqUser.id,
        },
        ...options
    })
    if(!hotel)
        throw new AppError('Không tìm thấy khách sạn', 404)

    return hotel
    }
const verifyBookingOwnerShip = async (bookingId, hotelId,partnerId, options= {}) => {
    const booking = await db.Booking.findOne({
        where: { id :bookingId},
        include: [{
            model: db.BookingDetail,
            as : 'bookingDetails',
            include: [
                {
                    model: db.RoomConfiguration,
                    as: 'roomConfiguration',
                    required: true,
                    include: [
                        {
                            model: db.Hotel,
                            as: 'hotel',
                            where: { id: hotelId, partnerId },
                            attributes: ['id', 'partnerId'],
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            model: db.Payment,
            as: 'payments',
            required: false,
        },
    ],
    ...options,
});

if (!booking) {
    throw new AppError('Không tìm thấy booking hoặc bạn không có quyền', 404);
}

return booking;
};
const getAll = async ({ hotelId, reqUser, filters = {} }) => {
    await verifyBookingOwnerShip(hotelId, reqUser.id);

    const bookingWhere = {};
    if (filters.status !== undefined) {
        bookingWhere.status = filters.status;
    }

    return await db.Booking.findAll({
        where: bookingWhere,
        include: [
            {
                model: db.BookingDetail,
                as: 'bookingDetails',
                required: true,
                include: [
                    {
                        model: db.RoomConfiguration,
                        as: 'roomConfiguration',
                        required: true,
                        where: { hotelId },
                        include: [
                            {
                                model: db.RoomType,
                                as: 'roomType',
                                attributes: ['id', 'name'],
                                required: false,
                            },
                        ],
                    },
                ],
            },
            {
                model: db.User,
                as: 'user',
                attributes: ['id', 'fullName', 'email', 'phone'],
                required: false,
            },
            {
                model: db.Payment,
                as: 'payments',
                required: false,
            },
        ],
        order: [['id', 'DESC']],
    });
};
const getById = async ({ id, hotelId, reqUser }) => {
    return await verifyBookingOwnerShip(id, hotelId, reqUser.id);
};
const updateStatus = async ({ id, hotelId, status, reqUser }) => {
    const booking = await verifyBookingOwnerShip(id, hotelId, reqUser.id);

    const allowedStatuses = ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'];
    if (!allowedStatuses.includes(status)) {
        throw new AppError('Trạng thái booking không hợp lệ', 400);
    }

    await booking.update({ status });
    return booking;
};


module.exports = {
    verifyHotelOwnership,
    verifyBookingOwnerShip,
    getAll,
    getById,
    updateStatus,
    
};
