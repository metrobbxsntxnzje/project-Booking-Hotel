'use strict';

const roomService = require('../../services/partner/room-manager.service');

const handleError = (res, error) => {
    const status = error.statusCode || 500;

    return res.status(status).json({
        message: error.message || 'lỗi hệ thống'
    });
};

const getAllController = async (req, res) => {
    try {
        const roomConfig = await roomService.getAllConfigs({
            hotelId: req.params.hotelId,
            reqUser: req.user,

        });

        return res.json({
            success: true,
            data: roomConfig
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const getByIdController = async (req, res) => {
    try {
        const config = await roomService.getConfigById({
            id: req.params.id,
            hotelId: req.params.hotelId,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: config
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const createController = async (req, res) => {
    try {
        const config = await roomService.createConfig({
            hotelId: req.params.hotelId,
            ...req.body,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: config
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const updateController = async (req, res) => {
    try {
        const config = await roomService.updateConfig({
            id: req.params.id,
            hotelId: req.params.hotelId,
            ...req.body,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: config
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const removeController = async (req, res) => {
    try {
        const result = await roomService.removeConfig({
            id: req.params.id,
            hotelId: req.params.hotelId,
            reqUser: req.user
        });

        return res.json({
            success: true,
            ...result
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const uploadImages = async (req, res) => {
    try {
        const result = await roomService.uploadImages({
            hotelId: req.params.hotelId,
            configId: req.params.configId,
            reqUser: req.user,
            images: req.body.images
        });

        return res.json({
            success: true,
            data: result
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const removeImage = async (req, res) => {
    try {
        const result = await roomService.removeImage({
            hotelId: req.params.hotelId,
            configId: req.params.configId,
            imageId: req.params.imageId,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: result
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const setPrimaryImage = async (req, res) => {
    try {
        const result = await roomService.setPrimaryImage({
            hotelId: req.params.hotelId,
            configId: req.params.configId,
            imageId: req.params.imageId,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: result
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const getAllPhysicalRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllPhysicalRooms({
            hotelId: req.params.hotelId,
            configId: req.params.configId,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: rooms
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const createPhysicalRoom = async (req, res) => {
    try {
        const room = await roomService.createPhysicalRoom({
            hotelId: req.params.hotelId,
            configId: req.params.configId,
            ...req.body,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: room
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const updatePhysicalRoom = async (req, res) => {
    try {
        const room = await roomService.updatePhysicalRoom({
            id: req.params.id,
            hotelId: req.params.hotelId,
            ...req.body,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: room
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const removePhysicalRoom = async (req, res) => {
    try {
        const result = await roomService.removePhysicalRoom({
            id: req.params.id,
            hotelId: req.params.hotelId,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: result
        });
    } catch (error) {
        return handleError(res, error);
    }
};

module.exports = {
    getAllController,
    getByIdController,
    createController,
    updateController,
    removeController,
    uploadImages,
    removeImage,
    setPrimaryImage,
    getAllPhysicalRooms,
    createPhysicalRoom,
    updatePhysicalRoom,
    removePhysicalRoom,
    getAllConfigs: getAllController,
    getConfigById: getByIdController,
    createConfig: createController,
    updateConfig: updateController,
    removeConfig: removeController
};
