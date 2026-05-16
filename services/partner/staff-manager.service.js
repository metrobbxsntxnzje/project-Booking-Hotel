'use strict';
const db = require('../../models');
const AppError = require('../../utils/appError');
const { where, Op } = require('sequelize');

/**
 * @param {any} reqUser
 * @returns {{ staffId: number }}
 */

const scope = (reqUser) => {
    return ({ staffId: reqUser.id })
}

const getAll = async ({ reqUser, filter = {} }) => {
   const  where = scope(reqUser)
   const hotel = await db.User.findAll({
    where,
    attributes:['id'],
   })
   const
}