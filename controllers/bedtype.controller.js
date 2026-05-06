'use strict'
const Service = require('../services/bedtype.service')

const handleError = (res, err) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Lỗi hệ thống'
    })
}

// CREATE
const create = async (req, res) => {
    try {
        const bed = await Service.create(req.body)

        return res.status(201).json({
            message: 'Tạo loại giường thành công',
            bed
        })
    } catch (err) {
        return handleError(res, err)
    }
}

// GET ALL
const getAll = async (req, res) => {
    try {
        const beds = await Service.getAll()
        return res.status(200).json(beds)
    } catch (err) {
        return handleError(res, err)
    }
}

// GET BY ID
const getById = async (req, res) => {
    try {
        const bed = await Service.getById(req.params.id)
        return res.status(200).json(bed)
    } catch (err) {
        return handleError(res, err)
    }
}

// UPDATE
const update = async (req, res) => {
    try {
        const bed = await Service.update({
            id: req.params.id,
            ...req.body
        })

        return res.status(200).json({
            message: 'Cập nhật thành công',
            bed
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
            message: 'Xóa thành công'
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