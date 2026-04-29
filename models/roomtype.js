'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomType extends Model {
    static associate(db) {
      RoomType.hasMany(db.RoomConfiguration, { foreignKey: 'roomTypeId', as: 'roomConfigurations' });
    }
  }

  RoomType.init({
    id:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
  }, {
    sequelize,
    modelName: 'RoomType',
    tableName: 'roomtypes',
    timestamps: false,
  });

  return RoomType;
};