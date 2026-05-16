'use strict';
const db = require('../../models');
const AppError = require('../../utils/appError');
const { Op } = require('sequelize');

/**
 * @param {any} reqUser
 * @returns {{ partnerId: number }}
 */
const partnerScope = (reqUser) => {
    return ({ partnerId: reqUser.id })
}

const getOwnedHotel = async (hotelId, reqUser, options = {}) => {
    const hotel = await db.Hotel.findOne({
        where: { id: hotelId, ...partnerScope(reqUser) },
        ...options,
    });

    if (!hotel) {
        throw new AppError('Không tìm thấy khách sạn hoặc bạn không có quyền', 404);
    }

    return hotel;
};

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

const uploadImages = async ({ hotelId, reqUser, images }) => {
    if (!Array.isArray(images) || images.length === 0) {
        throw new AppError('Danh sách ảnh không hợp lệ', 400);
    }

    await getOwnedHotel(hotelId, reqUser);

    const normalizedImages = images.map((image, index) => {
        const imageUrl = typeof image?.imageUrl === 'string'
            ? image.imageUrl.trim()
            : '';

        if (!imageUrl) {
            throw new AppError(`Ảnh tại vị trí ${index + 1} không hợp lệ`, 400);
        }

        return {
            hotelId,
            imageUrl,
            isPrimary: Boolean(image?.isPrimary),
        };
    });

    const primaryCount = normalizedImages.filter((image) => image.isPrimary).length;
    if (primaryCount > 1) {
        throw new AppError('Chỉ được chọn một ảnh chính', 400);
    }

    return await db.sequelize.transaction(async (transaction) => {
        const existingPrimary = await db.HotelImage.findOne({
            where: { hotelId, isPrimary: true },
            transaction,
        });

        if (primaryCount === 1) {
            await db.HotelImage.update(
                { isPrimary: false },
                {
                    where: { hotelId },
                    transaction,
                }
            );
        } else if (!existingPrimary) {
            normalizedImages[0].isPrimary = true;
        }

        await db.HotelImage.bulkCreate(normalizedImages, { transaction });

        const hotelImages = await db.HotelImage.findAll({
            where: { hotelId },
            order: [['id', 'ASC']],
            transaction,
        });

        return {
            message: 'Tải ảnh khách sạn thành công',
            images: hotelImages,
        };
    });
};

const removeImage = async ({ hotelId, imageId, reqUser }) => {
    await getOwnedHotel(hotelId, reqUser);

    return await db.sequelize.transaction(async (transaction) => {
        const hotelImage = await db.HotelImage.findOne({
            where: { id: imageId, hotelId },
            transaction,
        });

        if (!hotelImage) {
            throw new AppError('Không tìm thấy ảnh khách sạn', 404);
        }

        const wasPrimary = hotelImage.isPrimary;
        await hotelImage.destroy({ transaction });

        if (wasPrimary) {
            const nextPrimaryImage = await db.HotelImage.findOne({
                where: { hotelId },
                order: [['id', 'ASC']],
                transaction,
            });

            if (nextPrimaryImage) {
                await nextPrimaryImage.update({ isPrimary: true }, { transaction });
            }
        }

        return {
            message: 'Xóa ảnh khách sạn thành công',
        };
    });
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

module.exports = {
    getAll,
    getById,
    create,
    update,
    assignStaff,
    remove,
    uploadImages,
    removeImage,
};
