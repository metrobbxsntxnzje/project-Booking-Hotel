'use strict'
const db = require('../../../models');
const AppError = require('../../../utils/appError')
const getAll = async () => {
    return await db.City.findAll({
        where: {
            status: 'ACTIVE'
        },
        order: [['id', 'DESC']]
    })
}
const getById = async (id) => {
    const city = await db.City.findByPk(id);
    console.log('ID:', id)

    if (!city) {
        throw new AppError('Không tồn tại thành phố', 404)
    }
    return city
}




module.exports = { getAll, getById }