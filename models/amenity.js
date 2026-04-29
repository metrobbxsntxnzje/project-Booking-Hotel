'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Amenity extends Model {
    static associate(db) {
      Amenity.belongsToMany(db.RoomConfiguration, {
        through: db.RoomAmenity,
        foreignKey: 'amenityId',
        otherKey: 'roomConfigId',
        as: 'roomConfigurations',
      });
    }
  }

  Amenity.init({
    id:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    icon: { type: DataTypes.STRING(255) },
  }, {
    sequelize,
    modelName: 'Amenity',
    tableName: 'amenities',
    timestamps: false,
  });

  return Amenity;
};