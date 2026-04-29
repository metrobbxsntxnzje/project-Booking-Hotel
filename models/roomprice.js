'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomPrice extends Model {
    static associate(db) {
      RoomPrice.belongsTo(db.RoomConfiguration, { foreignKey: 'roomConfigId', as: 'roomConfiguration' });
    }
  }

  RoomPrice.init({
    id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomConfigId: { type: DataTypes.INTEGER, allowNull: false },
    date:         { type: DataTypes.DATEONLY, allowNull: false },
    price:        { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  }, {
    sequelize,
    modelName: 'RoomPrice',
    tableName: 'roomprices',
    timestamps: false,
  });

  return RoomPrice;
};