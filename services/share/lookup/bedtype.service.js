'use strict'
const db = require('../../../models')
const AppError = require('../../../utils/appError')

// CREATE
const create = async ({ name, maxPeople }) => {
    const normalizedName = name.trim().replace(/\s+/g, ' ')

    const existing = await db.BedType.findOne({
        where: { name: normalizedName }
    })

    if (existing) {
        throw new AppError('Loại giường đã tồn tại', 409)
    }

    return await db.BedType.create({
        name: normalizedName,
        maxPeople
    })
}

// GET ALL
const getAll = async () => {
    return await db.BedType.findAll()
}

// GET BY ID
const getById = async (id) => {
    const bed = await db.BedType.findByPk(id)

    if (!bed) {
        throw new AppError('Không tìm thấy loại giường', 404)
    }

    return bed
}

// UPDATE
const update = async ({ id, name, maxPeople }) => {
    const bed = await db.BedType.findByPk(id)

    if (!bed) {
        throw new AppError('Không tìm thấy loại giường', 404)
    }

    const normalizedName = name.trim().replace(/\s+/g, ' ')

    const existing = await db.BedType.findOne({
        where: { name: normalizedName }
    })

    if (existing && existing.id !== id) {
        throw new AppError('Loại giường đã tồn tại', 409)
    }

    return await bed.update({
        name: normalizedName,
        maxPeople
    })
}

// DELETE
const remove = async (id) => {
    const bed = await db.BedType.findByPk(id)

    if (!bed) {
        throw new AppError('Không tìm thấy loại giường', 404)
    }

    await bed.destroy()

    return true
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}