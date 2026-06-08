'use strict';

const db = require('../../models');
const AppError = require('../../utils/appError');

const ROOM_CONFIG_INCLUDE = [
    {
        model: db.RoomType,
        as: 'roomType',
        attributes: ['id', 'name']
    },
    {
        model: db.Amenity,
        as: 'amenities',
        attributes: ['id', 'name'],
        through: { attributes: [] }
    },
    {
        model: db.BedType,
        as: 'bedTypes',
        attributes: ['id', 'name'],
        through: { attributes: ['quantity'] }
    },
    {
        model: db.RoomImage,
        as: 'images',
        attributes: ['id', 'imageUrl', 'isPrimary']
    }
];

const verifyOwnership = async (configId, partnerId, hotelId, options = {}) => {
    const hotelWhere = { partnerId };
    if (hotelId !== undefined) {
        hotelWhere.id = hotelId;
    }

    const config = await db.RoomConfiguration.findOne({
        where: { id: configId },
        include: [
            {
                model: db.Hotel,
                as: 'hotel',
                where: hotelWhere,
                attributes: ['id', 'partnerId']
            }
        ],
        ...options
    });

    if (!config) {
        throw new AppError('Không tìm thấy cấu hình phòng hoặc bạn không có quyền', 404);
    }

    return config;
};

const verifyHotelOwnership = async (hotelId, partnerId) => {
    const hotel = await db.Hotel.findOne({
        where: { id: hotelId, partnerId }
    });

    if (!hotel) {
        throw new AppError('Hotel không tồn tại hoặc bạn không có quyền', 404);
    }

    return hotel;
};

const verifyPhysicalRoomOwnership = async (id, partnerId, hotelId, options = {}) => {
    const hotelWhere = { partnerId };
    if (hotelId !== undefined) {
        hotelWhere.id = hotelId;
    }

    const room = await db.PhysicalRoom.findOne({
        where: { id },
        include: [
            {
                model: db.RoomConfiguration,
                as: 'roomConfiguration',
                include: [
                    {
                        model: db.Hotel,
                        as: 'hotel',
                        where: hotelWhere,
                        attributes: ['id', 'partnerId']
                    }
                ]
            }
        ],
        ...options
    });

    if (!room) {
        throw new AppError('Không tìm thấy phòng hoặc bạn không có quyền', 404);
    }

    return room;
};

const getAllConfigs = async ({ hotelId, reqUser }) => {
    await verifyHotelOwnership(hotelId, reqUser.id);

    return await db.RoomConfiguration.findAll({
        where: { hotelId },
        attributes: ['id', 'hotelId', 'roomTypeId', 'basePrice', 'area', 'maxPeople', 'createdAt'],
        include: ROOM_CONFIG_INCLUDE,
        order: [['id', 'DESC']]
    });
};

const getConfigById = async ({ id, hotelId, reqUser }) => {
    const config = await verifyOwnership(id, reqUser.id, hotelId);

    return await config.reload({
        include: [
            ...ROOM_CONFIG_INCLUDE,
            {
                model: db.PhysicalRoom,
                as: 'physicalRooms',
                required: false
            }
        ]
    });
};

const createConfig = async ({
    hotelId,
    roomTypeId,
    basePrice,
    area,
    maxPeople,
    amenityIds = [],
    bedTypes = [],
    reqUser
}) => {
    await verifyHotelOwnership(hotelId, reqUser.id);

    const config = await db.sequelize.transaction(async (transaction) => {
        const createdConfig = await db.RoomConfiguration.create(
            {
                hotelId,
                roomTypeId,
                basePrice,
                area,
                maxPeople
            },
            { transaction }
        );

        if (amenityIds.length > 0) {
            await db.RoomAmenity.bulkCreate(
                amenityIds.map((amenityId) => ({
                    roomConfigId: createdConfig.id,
                    amenityId
                })),
                { transaction }
            );
        }

        if (bedTypes.length > 0) {
            await db.RoomConfigurationBedType.bulkCreate(
                bedTypes.map(({ bedTypeId, quantity }) => ({
                    roomConfigId: createdConfig.id,
                    bedTypeId,
                    quantity
                })),
                { transaction }
            );
        }

        return createdConfig;
    });

    return await getConfigById({ id: config.id, hotelId, reqUser });
};

const updateConfig = async ({
    id,
    hotelId,
    roomTypeId,
    basePrice,
    area,
    maxPeople,
    amenityIds,
    bedTypes,
    reqUser
}) => {
    await verifyOwnership(id, reqUser.id, hotelId);

    await db.sequelize.transaction(async (transaction) => {
        const config = await verifyOwnership(id, reqUser.id, hotelId, { transaction });

        const updatePayload = {};
        if (roomTypeId !== undefined) { updatePayload.roomTypeId = roomTypeId; }
        if (basePrice !== undefined) { updatePayload.basePrice = basePrice; }
        if (area !== undefined) { updatePayload.area = area; }
        if (maxPeople !== undefined) { updatePayload.maxPeople = maxPeople; }

        if (Object.keys(updatePayload).length > 0) {
            await config.update(updatePayload, { transaction });
        }

        if (amenityIds !== undefined) {
            await db.RoomAmenity.destroy({
                where: { roomConfigId: id },
                transaction
            });

            if (amenityIds.length > 0) {
                await db.RoomAmenity.bulkCreate(
                    amenityIds.map((amenityId) => ({
                        roomConfigId: id,
                        amenityId
                    })),
                    { transaction }
                );
            }
        }

        if (bedTypes !== undefined) {
            await db.RoomConfigurationBedType.destroy({
                where: { roomConfigId: id },
                transaction
            });

            if (bedTypes.length > 0) {
                await db.RoomConfigurationBedType.bulkCreate(
                    bedTypes.map(({ bedTypeId, quantity }) => ({
                        roomConfigId: id,
                        bedTypeId,
                        quantity
                    })),
                    { transaction }
                );
            }
        }
    });

    return await getConfigById({ id, hotelId, reqUser });
};

const removeConfig = async ({ id, hotelId, reqUser }) => {
    const config = await verifyOwnership(id, reqUser.id, hotelId);

    await config.update({ deleted_at: new Date() });

    return { message: 'Xóa cấu hình phòng thành công' };
};

const uploadImages = async ({ hotelId, configId, images = [], reqUser }) => {
    await verifyOwnership(configId, reqUser.id, hotelId);

    if (!Array.isArray(images) || images.length === 0) {
        throw new AppError('Danh sách ảnh không hợp lệ', 400);
    }

    return await db.sequelize.transaction(async (transaction) => {
        const existingPrimary = await db.RoomImage.findOne({
            where: { roomConfigId: configId, isPrimary: true },
            transaction
        });

        const normalizedImages = images.map((image, index) => {
            const imageUrl = typeof image === 'string' ? image.trim() : '';

            if (!imageUrl) {
                throw new AppError(`Ảnh tại vị trí ${index + 1} không hợp lệ`, 400);
            }

            return {
                roomConfigId: configId,
                imageUrl,
                isPrimary: !existingPrimary && index === 0
            };
        });

        await db.RoomImage.bulkCreate(normalizedImages, { transaction });

        return await db.RoomImage.findAll({
            where: { roomConfigId: configId },
            order: [['id', 'ASC']],
            transaction
        });
    });
};

const removeImage = async ({ hotelId, configId, imageId, reqUser }) => {
    await verifyOwnership(configId, reqUser.id, hotelId);

    return await db.sequelize.transaction(async (transaction) => {
        const image = await db.RoomImage.findOne({
            where: { id: imageId, roomConfigId: configId },
            transaction
        });

        if (!image) {
            throw new AppError('Không tìm thấy ảnh', 404);
        }

        const wasPrimary = image.isPrimary;
        await image.destroy({ transaction });

        if (wasPrimary) {
            const nextImage = await db.RoomImage.findOne({
                where: { roomConfigId: configId },
                order: [['id', 'ASC']],
                transaction
            });

            if (nextImage) {
                await nextImage.update({ isPrimary: true }, { transaction });
            }
        }

        return { message: 'Xóa ảnh thành công' };
    });
};

const setPrimaryImage = async ({ hotelId, configId, imageId, reqUser }) => {
    await verifyOwnership(configId, reqUser.id, hotelId);

    return await db.sequelize.transaction(async (transaction) => {
        const image = await db.RoomImage.findOne({
            where: { id: imageId, roomConfigId: configId },
            transaction
        });

        if (!image) {
            throw new AppError('Không tìm thấy ảnh', 404);
        }

        await db.RoomImage.update(
            { isPrimary: false },
            {
                where: { roomConfigId: configId },
                transaction
            }
        );

        await image.update({ isPrimary: true }, { transaction });

        return { message: 'Cập nhật ảnh chính thành công' };
    });
};

const getAllPhysicalRooms = async ({ configId, reqUser, hotelId }) => {
    await verifyOwnership(configId, reqUser.id, hotelId);
    return await db.PhysicalRoom.findAll({
        where: { roomConfigId: configId }
    });
};

const createPhysicalRoom = async ({ configId, roomNumber, floor, status = 'available', reqUser, hotelId }) => {
    await verifyOwnership(configId, reqUser.id, hotelId);

    return await db.PhysicalRoom.create({
        roomConfigId: configId,
        roomNumber,
        floor,
        status
    });
};

const updatePhysicalRoom = async ({ id, hotelId, roomNumber, floor, status, reqUser }) => {
    const room = await verifyPhysicalRoomOwnership(id, reqUser.id, hotelId);

    const updatePayload = {};
    if (roomNumber !== undefined) { updatePayload.roomNumber = roomNumber; }
    if (floor !== undefined) { updatePayload.floor = floor; }
    if (status !== undefined) { updatePayload.status = status; }

    return await room.update(updatePayload);
};

const removePhysicalRoom = async ({ id, hotelId, reqUser }) => {
    const room = await verifyPhysicalRoomOwnership(id, reqUser.id, hotelId);

    await room.update({ deleted_at: new Date() });

    return { message: 'Xóa phòng thành công' };
};



module.exports = {
    verifyOwnership,
    verifyHotelOwnership,
    getAllConfigs,
    getConfigById,
    createConfig,
    updateConfig,
    removeConfig,
    uploadImages,
    removeImage,
    setPrimaryImage,
    getAllPhysicalRooms,
    createPhysicalRoom,
    updatePhysicalRoom,
    removePhysicalRoom
};
