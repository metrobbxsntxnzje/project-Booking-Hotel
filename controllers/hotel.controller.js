'use strict';
const hotelService = require('../services/hotel.service');
const handleError = (res, error) => {

    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message || 'lỗi hệ thống' })

}
const getAll = async (req, res, next) => {
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

const getById = async (req, res, next) => {
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

const create = async (req, res, next) => {
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

const update = async (req, res, next) => {
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

const approve = async (req, res, next) => {
    try {
        const result = await hotelService.approve({
            id: req.params.id,
            reqUser: req.user,
            status: req.body.status,  // 'ACTIVE' | 'REJECTED'
        });
        res.json({ success: true, ...result });
    } catch (err) {
        return handleError(res, err);
    }
};

const assignStaff = async (req, res, next) => {
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

const remove = async (req, res, next) => {
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

module.exports = { getAll, getById, create, update, approve, assignStaff, remove };