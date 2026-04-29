'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomInventory extends Model {
    static associate(db) {
      RoomInventory.belongsTo(db.RoomConfiguration, { foreignKey: 'roomConfigId', as: 'roomConfiguration' });
    }
  }

  RoomInventory.init({
    id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomConfigId:   { type: DataTypes.INTEGER, allowNull: false },
    date:           { type: DataTypes.DATEONLY, allowNull: false },
    availableCount: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'RoomInventory',
    tableName: 'roominventory',
    timestamps: false,
  });

  return RoomInventory;
};