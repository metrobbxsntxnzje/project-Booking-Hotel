'use strict';

const hotelService = require('../../services/partner/hotel-manager.service');

const handleError = (res, error) => {
    const status = error.statusCode || 500;

    return res.status(status).json({
        message: error.message || 'lỗi hệ thống'
    });
};

const getAll = async (req, res) => {
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

const getById = async (req, res) => {
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

const create = async (req, res) => {
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

const update = async (req, res) => {
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

const remove = async (req, res) => {
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
    getAll,
    getById,
    create,
    update,
    remove,
    uploadImages,
    removeImage,
    getAllController: getAll,
    getByIdController: getById,
    createController: create,
    updateController: update,
    removeController: remove
};
