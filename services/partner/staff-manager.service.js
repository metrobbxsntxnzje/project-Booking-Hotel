'use strict';

const db = require('../../models');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError');
const { Op } = require('sequelize');

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
const STAFF_ROLE = 'Staff';

/** @type {string[]} */
const SAFE_USER_FIELDS = [
    'id',
    'fullName',
    'email',
    'phone',
    'gender',
    'birthDate',
    'avatarUrl',
    'address',
    'cityId',
    'wardId',
    'role',
    'status',
    'hotel_id',
    'created_by',
    'createdAt',
    'updatedAt',
    'deletedAt',
];

/** @type {string[]} */
const UPDATABLE_FIELDS = [
    'fullName',
    'phone',
    'gender',
    'birthDate',
    'avatarUrl',
    'address',
    'cityId',
    'wardId',
];

/**
 * @param {any} obj
 * @param {string[]} fields
 * @returns {Record<string, any>}
 */
const pick = (obj, fields) => {
    return fields.reduce((result, field) => {
        if (obj && obj[field] !== undefined) {
            result[field] = obj[field];
        }
        return result;
    }, /** @type {Record<string, any>} */({}));
};

/**
 * @param {any} user
 * @returns {Record<string, any> | null}
 */
const sanitizeUser = (user) => {
    const data = user?.toJSON ? user.toJSON() : user;
    if (!data) { return null; }
    return pick(data, SAFE_USER_FIELDS);
};

/**
 * @param {number} partnerId
 * @param {number | undefined} hotelId
 * @returns {Promise<number[]>}
 */
const getOwnedHotelIds = async (partnerId, hotelId) => {
    /** @type {Record<string, any>} */
    const where = { partnerId };

    if (hotelId !== undefined) {
        where.id = hotelId;
    }

    const hotels = await db.Hotel.findAll({
        where,
        attributes: ['id'],
    });

    if (hotelId !== undefined && hotels.length === 0) {
        throw new AppError('Khách sạn không tồn tại hoặc bạn không có quyền', 404);
    }

    return hotels.map((hotel) => hotel.id);
};

/**
  * @param {number} hotelId
 * @param {number} partnerId

 * @param {Record<string, any>} [options]
 * @returns {Promise<any>}
 */
const verifyHotelOwnership = async (hotelId, partnerId, options = {}) => {
    const hotel = await db.Hotel.findOne({
        where: { id: hotelId, partnerId },
        ...options,
    });

    if (!hotel) {
        throw new AppError('Khách sạn không tồn tại hoặc bạn không có quyền', 404);
    }

    return hotel;
};

/**
  
 * @param {number} hotelId
 * @param {number} partnerId
 * @param {number} staffId
 * @param {Record<string, any>} [options]
 * @returns {Promise<any>}
 */
const verifyStaffOwnership = async (hotelId, staffId, partnerId, options = {}) => {
    const staff = await db.User.findOne({
        where: {
            id: staffId,
            role: STAFF_ROLE,
            hotel_id: hotelId,
        },
        ...options,
    });

    if (!staff) {
        throw new AppError('Không tìm thấy nhân viên', 404);
    }

    if (!staff.hotel_id) {
        throw new AppError('Nhân viên chưa được gán vào khách sạn nào', 403);
    }

    await verifyHotelOwnership(staff.hotel_id, partnerId, options);

    return staff;
};

/**
 * @param {{ reqUser: any, filters?: Record<string, any> }} params
 */
const getAll = async ({ reqUser, filters = {} }) => {
    const hotelId = filters.hotelId ? Number(filters.hotelId) : undefined;
    const hotelIds = await getOwnedHotelIds(reqUser.id, hotelId);

    if (hotelIds.length === 0) {
        return [];
    }

    /** @type {Record<string, any>} */
    const where = {
        role: STAFF_ROLE,
        hotel_id: { [Op.in]: hotelIds },
    };

    if (filters.fullName) {
        where.fullName = { [Op.like]: `%${String(filters.fullName).trim()}%` };
    }

    if (filters.email) {
        where.email = { [Op.like]: `%${String(filters.email).trim()}%` };
    }

    if (filters.phone) {
        where.phone = { [Op.like]: `%${String(filters.phone).trim()}%` };
    }

    if (filters.status) {
        where.status = filters.status;
    }

    const staffList = await db.User.findAll({
        where,
        order: [['id', 'DESC']],
    });

    return staffList.map(sanitizeUser);
};

/**
 * @param {{ id: number, reqUser: any , hotelId:number}} params
 */
const getById = async ({ id, reqUser, hotelId }) => {
    const staff = await verifyStaffOwnership(id, reqUser.id, hotelId);
    return sanitizeUser(staff);
};

/**
 * @param {{ reqUser: any } & Record<string, any>} params
 */
const create = async ({ reqUser, ...payload }) => {
    return await db.sequelize.transaction(async (transaction) => {
        await verifyHotelOwnership(payload.hotelId, reqUser.id, { transaction });

        const existedUser = await db.User.findOne({
            where: { email: payload.email ,


            },
            transaction,
        });

        if (existedUser) {
            throw new AppError('Email này đã tồn tại', 409);
        }

        const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);

        const staff = await db.User.create({
            fullName: payload.fullName,
            email: payload.email,
            password: hashedPassword,
            phone: payload.phone,
            gender: payload.gender,
            birthDate: payload.birthDate,
            avatarUrl: payload.avatarUrl,
            address: payload.address,
            cityId: payload.cityId,
            wardId: payload.wardId,
            status: payload.status || 'ACTIVE',
            role: STAFF_ROLE,
            hotel_id: payload.hotelId,
            created_by: reqUser.id,
        }, { transaction });

        return sanitizeUser(staff);
    });
};


/**
 * @param {{ id: number, reqUser: any,hotelId:any } & Record<string, any>} params
 */
const update = async ({ id, reqUser, hotelId, ...payload }) => {
    return await db.sequelize.transaction(async (transaction) => {
        const staff = await verifyStaffOwnership(id, reqUser.id, hotelId, { transaction });

        /** @type {Record<string, any>} */
        const updatePayload = pick(payload, UPDATABLE_FIELDS);

        if (payload.email !== undefined) {
            if (payload.email !== staff.email) {
                const existedUser = await db.User.findOne({
                    where: {
                        email: payload.email,
                        id: { [Op.ne]: staff.id },
                    },
                    transaction,
                });

                if (existedUser) {
                    throw new AppError('Email này đã tồn tại', 409);
                }
            }

            updatePayload.email = payload.email;
        }

        if (payload.status !== undefined) {
            updatePayload.status = payload.status;
        }

        if (payload.hotelId !== undefined) {
            await verifyHotelOwnership(payload.hotelId, reqUser.id, { transaction });
            updatePayload.hotel_id = payload.hotelId;
        }

        if (payload.password !== undefined) {
            updatePayload.password = await bcrypt.hash(payload.password, SALT_ROUNDS);
        }

        await staff.update(updatePayload, { transaction });

        return sanitizeUser(staff);
    });
};

/**
 * @param {{ id: number, reqUser: any ,hotelId:number}} params
 */
const remove = async ({ id, reqUser, hotelId }) => {
    const staff = await verifyStaffOwnership(id, hotelId, reqUser.id);

    await staff.update({
        deletedAt: new Date(),
        status: 'BLOCKED',
    });

    return { message: 'Xóa nhân viên thành công' };
};

module.exports = {
    verifyHotelOwnership,
    verifyStaffOwnership,
    getAll,
    getById,
    create,
    update,
    remove,
};