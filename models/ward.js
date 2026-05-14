'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ward extends Model {
    static associate(db) {
      Ward.belongsTo(db.City, { foreignKey: 'cityId', as: 'city' });
      Ward.hasMany(db.Hotel, { foreignKey: 'wardId', as: 'hotels' });
      Ward.hasMany(db.User, { foreignKey: 'wardId', as: 'users' });
    }
  }

  Ward.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cityId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      allowNull: false,
      defaultValue: 'ACTIVE',

    },
  }, {
    sequelize,
    modelName: 'Ward',
    tableName: 'wards',
    timestamps: false,
  });

  return Ward;
};