'use strict';
const hotelService = require('../../services/partner/hotel-manager.service');
const handleError = (res, error) => {

    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message || 'lỗi hệ thống' })

}
const getAllController = async (req, res, next) => {
    try {
        const hotels = await hotelService.getAll({
            reqUser: req.user,
            filters: req.query,   // name, city, status
        });
        res.json({
            success: true,
            data: hotels
        });
    } catch (err) {
        return handleError(res, err);
    }
};

const getByIdController = async (req, res, next) => {
    try {
        const hotel = await hotelService.getById({
            id: req.params.id,
            reqUser: req.user,
        });
        res.json({ success: true, data: hotel });
    } catch (err) {
        return handleError(res, err);
    }
};

const createController = async (req, res, next) => {
    try {
        const hotel = await hotelService.create({
            reqUser: req.user,
            ...req.body,
        });
        res.status(201).json({ success: true, data: hotel });
    } catch (err) {
        return handleError(res, err);
    }
};

const updateController = async (req, res, next) => {
    try {
        const hotel = await hotelService.update({
            id: req.params.id,
            reqUser: req.user,
            ...req.body,
        });
        res.json({ success: true, data: hotel });
    } catch (err) {
        return handleError(res, err);
    }
};



const assignStaffController = async (req, res, next) => {
    try {
        const result = await hotelService.assignStaff({
            hotelId: req.params.id,
            staffId: req.body.staffId,
            reqUser: req.user,
        });
        res.json({ success: true, ...result });
    } catch (err) {
        return handleError(res, err);
    }
};

const removeController = async (req, res, next) => {
    try {
        const result = await hotelService.remove({
            id: req.params.id,
            reqUser: req.user,
        });
        res.json({ success: true, ...result });
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports = {
    getAllController, getByIdController, createController,
    updateController, assignStaffController, removeController
};