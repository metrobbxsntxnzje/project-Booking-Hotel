'use strict';

const hotelService = require('../../services/partner/hotel-manager.service');

const handleError = (res, error) => {
    const status = error.statusCode || 500;

    return res.status(status).json({
        message: error.message || 'lỗi hệ thống'
    });
};

const getAllController = async (req, res) => {
    try {
        const hotels = await hotelService.getAll({
            reqUser: req.user,
            filters: req.query
        });

        return res.json({
            success: true,
            data: hotels
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const getByIdController = async (req, res) => {
    try {
        const hotel = await hotelService.getById({
            id: req.params.id,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: hotel
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const createController = async (req, res) => {
    try {
        const hotel = await hotelService.create({
            ...req.body,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: hotel
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const updateController = async (req, res) => {
    try {
        const hotel = await hotelService.update({
            id: req.params.id,
            ...req.body,
            reqUser: req.user
        });

        return res.json({
            success: true,
            data: hotel
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const removeController = async (req, res) => {
    try {
        const result = await hotelService.remove({
            id: req.params.id,
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
        const result = await hotelService.uploadImages({
            hotelId: req.params.id,
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
        const result = await hotelService.removeImage({
            hotelId: req.params.id,
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

module.exports = {
    getAllController,
    getByIdController,
    createController,
    updateController,
    removeController,
    uploadImages,
    removeImage,

};
