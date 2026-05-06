'use strict'
const db = require('../models')
const AppError = require('../utils/appError')

// CREATE
const create = async ({ name, cityId }) => {
    const normalizedName = name.trim().replace(/\s+/g, ' ')

    const city = await db.City.findByPk(cityId)
    if (!city) {
        throw new AppError('Thành phố không tồn tại', 404)
    }

    const existing = await db.Ward.findOne({
        where: { name: normalizedName, cityId }
    })

    if (existing) {
        throw new AppError('Phường đã tồn tại trong thành phố này', 409)
    }

    return await db.Ward.create({
        name: normalizedName,
        cityId
    })
}

const getAll = async () => {
    return await db.Ward.findAll({
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

const update = async ({ id, name, cityId }) => {
    const ward = await db.Ward.findByPk(id)
    if (!ward) {
        throw new AppError('Không tìm thấy phường', 404)
    }

    const normalizedName = name.trim().replace(/\s+/g, ' ')

    const existing = await db.Ward.findOne({
        where: { name: normalizedName, cityId }
    })

    if (existing && existing.id !== id) {
        throw new AppError('Phường đã tồn tại trong thành phố này', 409)
    }

    return await ward.update({
        name: normalizedName,
        cityId
    })
}

const remove = async (id) => {
    const ward = await db.Ward.findByPk(id)

    if (!ward) {
        throw new AppError('Không tìm thấy phường', 404)
    }

    await ward.destroy()

    return true
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}