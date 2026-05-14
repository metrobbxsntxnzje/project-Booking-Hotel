'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(db) {
      City.hasMany(db.Ward, { foreignKey: 'cityId', as: 'wards' });
      City.hasMany(db.Hotel, { foreignKey: 'cityId', as: 'hotels' });
      City.hasMany(db.User, { foreignKey: 'cityId', as: 'users' });
    }
  }

  City.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      allowNull: false,
      defaultValue: 'ACTIVE',

    },
    deletedAt: { type: DataTypes.DATE },
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'cities',
    timestamps: false,
    paranoid: true,
  });

  return City;
};