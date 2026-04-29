'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomConfigurationBedType extends Model {
    static associate(db) {}
  }

  RoomConfigurationBedType.init({
    roomConfigId: { type: DataTypes.INTEGER, primaryKey: true },
    bedTypeId:    { type: DataTypes.INTEGER, primaryKey: true },
    quantity:     { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'RoomConfigurationBedType',
    tableName: 'roomconfiguration_bedtypes',
    timestamps: false,
  });

  return RoomConfigurationBedType;
};