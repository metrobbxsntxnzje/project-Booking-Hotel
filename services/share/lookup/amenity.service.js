'use strict'
const db = require('../../../models')
const AppError = require('../../../utils/appError')

// CREATE
const create = async ({ name, icon }) => {
    const normalizedName = name.trim().replace(/\s+/g, ' ')

    const existing = await db.Amenity.findOne({
        where: { name: normalizedName }
    })

    if (existing) {
        throw new AppError('Tiện ích đã tồn tại', 409)
    }

    return await db.Amenity.create({
        name: normalizedName,
        icon
    })
}

// GET ALL
const getAll = async () => {
    return await db.Amenity.findAll()
}

// GET BY ID
const getById = async (id) => {
    const amenity = await db.Amenity.findByPk(id)

    if (!amenity) {
        throw new AppError('Không tìm thấy tiện ích', 404)
    }

    return amenity
}

// UPDATE
const update = async ({ id, name, icon }) => {
    const amenity = await db.Amenity.findByPk(id)

    if (!amenity) {
        throw new AppError('Không tìm thấy tiện ích', 404)
    }

    const normalizedName = name.trim().replace(/\s+/g, ' ')

    const existing = await db.Amenity.findOne({
        where: { name: normalizedName }
    })

    if (existing && existing.id !== id) {
        throw new AppError('Tiện ích đã tồn tại', 409)
    }

    return await amenity.update({
        name: normalizedName,
        icon
    })
}

// DELETE
const remove = async (id) => {
    const amenity = await db.Amenity.findByPk(id)

    if (!amenity) {
        throw new AppError('Không tìm thấy tiện ích', 404)
    }

    await amenity.destroy()

    return true
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}