'use strict';

const db = require('../../models');
const { Op } = require('sequelize');
const AppError = require('../../utils/appError');

const verifyConfigOwnership = async (configId, partnerId, hotelId, options = {}) => {
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
                attributes: ['id', 'partnerId'],
            },
        ],
        ...options,
    });

    if (!config) {
        throw new AppError('Không tìm thấy cấu hình phòng hoặc bạn không có quyền', 404);
    }

    return config;
};

const getAllPrices = async ({ hotelId, configId, reqUser }) => {
    await verifyConfigOwnership(configId, reqUser.id, hotelId);

    return await db.RoomPrice.findAll({
        where: { roomConfigId: configId },
        order: [['date', 'ASC']],
    });
};

const setPrices = async ({ hotelId, configId, prices = [], reqUser }) => {
    await verifyConfigOwnership(configId, reqUser.id, hotelId);

    if (!Array.isArray(prices) || prices.length === 0) {
        throw new AppError('prices phải là mảng và phải có ít nhất 1 phần tử', 400);
    }

    return await db.sequelize.transaction(async (transaction) => {
        for (const item of prices) {
            const existed = await db.RoomPrice.findOne({
                where: {
                    roomConfigId: configId,
                    date: item.date,
                },
                transaction,
            });

            if (existed) {
                await existed.update({ price: item.price }, { transaction });
            } else {
                await db.RoomPrice.create({
                    roomConfigId: configId,
                    date: item.date,
                    price: item.price,
                }, { transaction });
            }
        }

        return await db.RoomPrice.findAll({
            where: { roomConfigId: configId },
            order: [['date', 'ASC']],
            transaction,
        });
    });
};

const updatePrice = async ({ hotelId, configId, id, date, price, reqUser }) => {
    await verifyConfigOwnership(configId, reqUser.id, hotelId);

    const roomPrice = await db.RoomPrice.findOne({
        where: { id, roomConfigId: configId },
    });

    if (!roomPrice) {
        throw new AppError('Không tìm thấy giá phòng', 404);
    }

    const updatePayload = {};

    if (date !== undefined) {
        const duplicated = await db.RoomPrice.findOne({
            where: {
                roomConfigId: configId,
                date,
                id: { [Op.ne]: id },
            },
        });

        if (duplicated) {
            throw new AppError('Ngày giá đã tồn tại', 409);
        }

        updatePayload.date = date;
    }

    if (price !== undefined) {
        updatePayload.price = price;
    }

    await roomPrice.update(updatePayload);
    return roomPrice;
};

const removePrice = async ({ hotelId, configId, id, reqUser }) => {
    await verifyConfigOwnership(configId, reqUser.id, hotelId);

    const roomPrice = await db.RoomPrice.findOne({
        where: { id, roomConfigId: configId },
    });

    if (!roomPrice) {
        throw new AppError('Không tìm thấy giá phòng', 404);
    }

    await roomPrice.destroy();

    return { message: 'Xóa giá phòng thành công' };
};

const getInventory = async ({ hotelId, configId, reqUser }) => {
    await verifyConfigOwnership(configId, reqUser.id, hotelId);

    return await db.RoomInventory.findAll({
        where: { roomConfigId: configId },
        order: [['date', 'ASC']],
    });
};

const updateInventory = async ({ hotelId, configId, inventory = [], reqUser }) => {
    await verifyConfigOwnership(configId, reqUser.id, hotelId);

    if (!Array.isArray(inventory) || inventory.length === 0) {
        throw new AppError('inventory phải là mảng và phải có ít nhất 1 phần tử', 400);
    }

    return await db.sequelize.transaction(async (transaction) => {
        for (const item of inventory) {
            const existed = await db.RoomInventory.findOne({
                where: {
                    roomConfigId: configId,
                    date: item.date,
                },
                transaction,
            });

            if (existed) {
                await existed.update({ availableCount: item.availableCount }, { transaction });
            } else {
                await db.RoomInventory.create({
                    roomConfigId: configId,
                    date: item.date,
                    availableCount: item.availableCount,
                }, { transaction });
            }
        }

        return await db.RoomInventory.findAll({
            where: { roomConfigId: configId },
            order: [['date', 'ASC']],
            transaction,
        });
    });
};

module.exports = {
    getAllPrices,
    setPrices,
    updatePrice,
    removePrice,
    getInventory,
    updateInventory,
};
