'use strict'
const Service = require('../../services/share/lookup/ward.service')

const handleError = (res, error) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Lỗi hệ thống'
    })
}



// GET ALL
const getAllController = async (req, res) => {
    try {
        const wards = await Service.getAll()
        return res.status(200).json(wards)
    } catch (err) {
        return handleError(res, err)
    }
}

// GET BY ID
const getByIdController = async (req, res) => {
    try {
        const ward = await Service.getById(req.params.id)

        return res.status(200).json(ward)
    } catch (err) {
        return handleError(res, err)
    }
}



module.exports = {
    
    getAllController,
    getByIdController,
    
}