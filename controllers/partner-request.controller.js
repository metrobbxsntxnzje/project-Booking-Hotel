'use strict';
const partnerRequestService = require('../services/partner-request.service');
const admintService = require('../services/admin/partner-manager/partner-request.service');

const handleError = (res, err) => {
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Lỗi hệ thống',
    });
};

const registerPartner = async (req, res, next) => {
    try {
        const { companyName, taxCode, businessLicense } = req.body;
        const request = await partnerRequestService.registerPartner({
            reqUser: req.user,
            companyName,
            taxCode,
            businessLicense,
        });
        return res.status(201).json({
            message: 'Gửi yêu cầu thành công, vui lòng chờ Admin xét duyệt',
            data: request,
        });
    } catch (err) {
        handleError(res, err);
    }
};

const getAllRequests = async (req, res, next) => {
    try {
        const { status } = req.query;
        const data = await admintService.getAllRequests(
            {
                reqUser: req.user,
                status
            });
        return res.status(200).json({ data });
    } catch (err) {
        handleError(res, err);

    }
};

const getMyRequest = async (req, res, next) => {
    try {
        const data = await partnerRequestService.getMyRequest({ reqUser: req.user });
        return res.status(200).json({ data });
    } catch (err) {
        handleError(res, err);

    }
};

const reviewRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, adminNote } = req.body;
        const result = await admintService.reviewRequest({
            id: parseInt(id),
            reqUser: req.user,
            status,
            adminNote,
        });
        return res.status(200).json(result);
    } catch (err) {
        handleError(res, err);
        ;
    }
};

module.exports = { registerPartner, getAllRequests, getMyRequest, reviewRequest };