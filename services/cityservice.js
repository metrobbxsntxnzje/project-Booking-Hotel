'use strict'
const db = require('../models');
const AppError = require('../utils/appError')
const getAll = async () => {
    return await db.city.findAll({
        order: [['id', 'DESC']]
    })
}
const getById = async ({ id }) => {
    const cityId = await db.city.findByPk(id);
    if (!cityId) {
        throw new AppError('Không tồn tại thành phố', 404)
    }
    return cityId
}

const create = async ({ name }) => {
    const normalizedName = name.trim().replace(/\s+/g, ' ')
    const existingCity = await db.city.findOne({
        where: { name: normalizedName }
    })
    if (existingCity) {
        throw new AppError('Thành phố đã tồn tại', 409)
    }
    const newCity = await db.city.create({
        name: normalizedName
    })
    return newCity
}
const update = async ({ id, name }) => {
    const normalizedName = name.trim().replace(/\s+/g, ' ')
    const city = await db.city.findByPk(id)
    if (!city) {
        throw new AppError('Thành phố không tồn tại', 404)
    }

    const existingCity = await db.city.findOne({
        where: { name: normalizedName }
    })
    if (existingCity && existingCity.id !== id) {
        throw new AppError('Thành phố đã tồn tại', 409)
    }
    city.name = normalizedName
    await city.save()
    return city
}

module.exports = { getAll, create, getById, update }