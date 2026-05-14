'use strict';
const partnerRequestService = require('../services/share/user/user.service');

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



const getMyRequest = async (req, res, next) => {
    try {
        const data = await partnerRequestService.getMyRequest({ reqUser: req.user });
        return res.status(200).json({ data });
    } catch (err) {
        handleError(res, err);

    }
};



module.exports = { registerPartner, getMyRequest };