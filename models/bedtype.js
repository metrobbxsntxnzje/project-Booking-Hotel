'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BedType extends Model {
    static associate(db) {
      BedType.belongsToMany(db.RoomConfiguration, {
        through: db.RoomConfigurationBedType,
        foreignKey: 'bedTypeId',
        otherKey: 'roomConfigId',
        as: 'roomConfigurations',
      });
    }
  }

  BedType.init({
    id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:       { type: DataTypes.STRING(255), allowNull: false },
    maxPeople:  { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'BedType',
    tableName: 'bedtypes',
    timestamps: false,
  });

  return BedType;
};