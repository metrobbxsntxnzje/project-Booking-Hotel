'use strict'
const Service = require('../services/ward.service')

const handleError = (res, error) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Lỗi hệ thống'
    })
}

// CREATE
const create = async (req, res) => {
    try {
        const ward = await Service.create(req.body)

        return res.status(201).json({
            message: 'Tạo phường thành công',
            ward
        })
    } catch (err) {
        return handleError(res, err)
    }
}

// GET ALL
const getAll = async (req, res) => {
    try {
        const wards = await Service.getAll()

        return res.status(200).json(wards)
    } catch (err) {
        return handleError(res, err)
    }
}

// GET BY ID
const getById = async (req, res) => {
    try {
        const ward = await Service.getById(req.params.id)

        return res.status(200).json(ward)
    } catch (err) {
        return handleError(res, err)
    }
}

// UPDATE
const update = async (req, res) => {
    try {
        const ward = await Service.update({
            id: req.params.id,
            ...req.body
        })

        return res.status(200).json({
            message: 'Cập nhật phường thành công',
            ward
        })
    } catch (err) {
        return handleError(res, err)
    }
}

// DELETE
const remove = async (req, res) => {
    try {
        await Service.remove(req.params.id)

        return res.status(200).json({
            message: 'Xóa phường thành công'
        })
    } catch (err) {
        return handleError(res, err)
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}