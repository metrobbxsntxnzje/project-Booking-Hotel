'use strict'
const db = require('../../../models')
const AppError = require('../../../utils/appError')


const getAll = async () => {
    return await db.Ward.findAll(
        {
            where: {
                status: 'ACTIVE'
            },
            include: [{ model: db.City, as: 'city' }]
        })
}

const getById = async (id) => {
    const ward = await db.Ward.findByPk(id, {
        include: [{ model: db.City, as: 'city' }]
    })

    if (!ward) {
        throw new AppError('Không tìm thấy phường', 404)
    }

    return ward
}



module.exports = {
    getAll,
    getById,
}