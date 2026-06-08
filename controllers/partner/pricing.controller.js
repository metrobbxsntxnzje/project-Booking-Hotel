'use strict';

const pricingService = require('../../services/partner/pricing-manager.service');

const handleError = (res, error) => {
    const status = error.statusCode || 500;

    return res.status(status).json({
        message: error.message || 'lỗi hệ thống',
    });
};

const getPrices = async (req, res) => {
    try {
        const prices = await pricingService.getAllPrices({
            hotelId: Number(req.params.hotelId),
            configId: Number(req.params.configId),
            reqUser: req.user,
        });

        return res.json({
            success: true,
            data: prices,
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const setPrices = async (req, res) => {
    try {
        const prices = await pricingService.setPrices({
            hotelId: Number(req.params.hotelId),
            configId: Number(req.params.configId),
            prices: req.body.prices,
            reqUser: req.user,
        });

        return res.json({
            success: true,
            data: prices,
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const updatePrice = async (req, res) => {
    try {
        const price = await pricingService.updatePrice({
            hotelId: Number(req.params.hotelId),
            configId: Number(req.params.configId),
            id: Number(req.params.id),
            ...req.body,
            reqUser: req.user,
        });

        return res.json({
            success: true,
            data: price,
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const removePrice = async (req, res) => {
    try {
        const result = await pricingService.removePrice({
            hotelId: Number(req.params.hotelId),
            configId: Number(req.params.configId),
            id: Number(req.params.id),
            reqUser: req.user,
        });

        return res.json({
            success: true,
            ...result,
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const getInventory = async (req, res) => {
    try {
        const inventory = await pricingService.getInventory({
            hotelId: Number(req.params.hotelId),
            configId: Number(req.params.configId),
            reqUser: req.user,
        });

        return res.json({
            success: true,
            data: inventory,
        });
    } catch (error) {
        return handleError(res, error);
    }
};

const updateInventory = async (req, res) => {
    try {
        const inventory = await pricingService.updateInventory({
            hotelId: Number(req.params.hotelId),
            configId: Number(req.params.configId),
            inventory: req.body.inventory,
            reqUser: req.user,
        });

        return res.json({
            success: true,
            data: inventory,
        });
    } catch (error) {
        return handleError(res, error);
    }
};

module.exports = {
    getPrices,
    setPrices,
    updatePrice,
    removePrice,
    getInventory,
    updateInventory,
};
