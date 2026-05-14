'use strict'
const Service = require('../../services/share/lookup/city.service')
const handleError = (res, error) => {
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message || 'lỗi hệ thống' })

}
const getAllController = async (req, res) => {
    try {
        const result = await Service.getAll()
        return res.status(200).json({
            message: 'Danh sách các thành phố',
            data: result
        })
    } catch (error) {
        return handleError(res, error);
    }
}


const getByIdController = async (req, res) => {
    try {
        const result = await Service.getById(
            req.params.id
        )
        console.log(req.params.id)

        return res.status(200).json({
            data: result
        })
    } catch (error) {
        return handleError(res, error)
    }
}

module.exports = {
    getByIdController,
    getAllController
}

