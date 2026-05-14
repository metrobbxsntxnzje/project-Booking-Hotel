'use strict'
const Service = require('../../services/admin/share/city-manager.service')
const handleError = (res, error) => {

    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message || 'lỗi hệ thống' })

}
const getAllController = async (req, res) => {
    try {
        const data = await Service.getAll()
        return res.status(200).json({ message: 'Danh sách các thành phố', data })
    } catch (error) {
        return handleError(res, error);
    }
}
const createController = async (req, res) => {
    try {
        const city = await Service.create(req.body)
        return res.status(201).json({ message: 'Tạo thành phố thành công', city })
    }
    catch (error) {
        return handleError(res, error);
    }
}
const updateController = async (req, res) => {

    try {
        const update = await Service.update({
            id: req.params.id,
            ...req.body,
        })
        return res.status(200).json({ message: 'Sửa thành phố thành công', update })
    }
    catch (error) {
        return handleError(res, error)
    }
}
const removeController = async (req, res) => {
    try {
        const data = await Service.remove(req.params.id)
        return res.status(200).json({ message: 'Xóa thành phố thành công' })
    } catch (error) {
        return handleError(res, error)

    }
}
const getByIdController = async (req, res) => {
    try {
        const city = await Service.getById(req.params.id)

        return res.status(200).json({
            city
        })
    } catch (error) {
        return handleError(res, error)
    }
}

module.exports = {
    createController,
    updateController,
    removeController,
    getByIdController,
    getAllController
}

