'use strict';
const staffService = require('../../services/partner/staff-manager.service');
const handleError = (res, error) => {

    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message || 'lỗi hệ thống' })

}
const getAllController = async (req, res,) => {
    try {
        const staff = await staffService.getAll({
            reqUser: req.user,
            filters: {
                ...req.query,
                hotelId: req.params.hotelId
            } // name, city, status
        });
        res.json({
            success: true,
            data: staff
        });
    } catch (err) {
        return handleError(res, err);
    }
};

const getByIdController = async (req, res) => {
    try {
        const staff = await staffService.getById({
            id: req.params.id,
            hotelId: req.params.hotelId,
            reqUser: req.user,
        });

        res.json({
            success: true,
            data: staff,
        });
    } catch (err) {
        return handleError(res, err);
    }
};

const createController = async (req, res) => {
    try {
        const staff = await staffService.create({
            reqUser: req.user,
            hotelId: req.params.hotelId,
            ...req.body,
        });

        res.status(201).json({
            success: true,
            data: staff,
        });
    } catch (err) {
        return handleError(res, err);
    }
};

const updateController = async (req, res) => {
    try {
        const staff = await staffService.update({
            id: req.params.id,
            reqUser: req.user,
            hotelId: req.params.hotelId,
            ...req.body,
        });

        res.json({
            success: true,
            data: staff,
        });
    } catch (err) {
        return handleError(res, err);
    }
};





const removeController = async (req, res) => {
    try {
        const result = await staffService.remove({
            id: req.params.id,
            hotelId: req.params.hotelId,
            reqUser: req.user,
        });

        res.json({
            success: true,
            ...result,
        });
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports = {
    getAllController, getByIdController, createController,
    updateController, removeController
};