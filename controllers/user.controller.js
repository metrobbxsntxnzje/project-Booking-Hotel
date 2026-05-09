'use strict';

const Service = require('../services/user.service');
const { serialize } = require('../serializers/user.serializers');
const serializeUser = (role) => serialize('User', role);

const handleError = (res, err) => {
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Lỗi hệ thống',
    });
};

const getAllController = async (req, res, next) => {
    try {

        const data = await Service.getAll();

        return res.status(200).json({
            success: true,
            data,
        });

    } catch (err) {
        return handleError(res, err);
    }
};

const getByIdController = async (req, res, next) => {
    try {

        const data = await Service.getById({
            id: req.params.id,
        });

        return res.status(200).json({
            success: true,
            data,
        });

    } catch (err) {
        return handleError(res, err);
    }
};

const createController = async (req, res, next) => {
    try {

        const data = await Service.create({
            ...req.body,
        });

        return res.status(201).json({
            success: true,
            message: 'Tạo người dùng thành công',
            data,
        });

    } catch (err) {
        return handleError(res, err);
    }
};

const updateController = async (req, res, next) => {
    try {

        const data = await Service.update({
            id: req.params.id,
            ...req.body,
        });

        return res.status(200).json({
            success: true,
            message: 'Cập nhật người dùng thành công',
            data,
        });

    } catch (err) {
        return handleError(res, err);
    }
};

const removeController = async (req, res, next) => {
    try {

        const data = await Service.remove({
            id: req.params.id,
        });

        return res.status(200).json({
            success: true,
            message: data.message,
        });

    } catch (err) {
        return handleError(res, err);
    }
};

const getMeController = async (req, res, next) => {
    try {

        const data = await Service.getById({
            id: req.user.id,
        });

        return res.status(200).json({
            success: true,
            data,
        });

    } catch (err) {
        return handleError(res, err);
    }
};

const updateMeController = async (req, res, next) => {
    try {

        const data = await Service.update({
            id: req.user.id,
            ...req.body,
        });

        return res.status(200).json({
            success: true,
            message: 'Cập nhật thông tin cá nhân thành công',
            data,
        });

    } catch (err) {
        return handleError(res, err);
    }
};

module.exports = {
    getAllController,
    getByIdController,
    createController,
    updateController,
    removeController,
    getMeController,
    updateMeController,
};