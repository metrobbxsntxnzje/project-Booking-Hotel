'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomAmenity extends Model {
    static associate(db) {}
  }

  RoomAmenity.init({
    roomConfigId: { type: DataTypes.INTEGER, primaryKey: true },
    amenityId:    { type: DataTypes.INTEGER, primaryKey: true },
  }, {
    sequelize,
    modelName: 'RoomAmenity',
    tableName: 'roomamenities',
    timestamps: false,
  });

  return RoomAmenity;
};