'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {
    static associate(db) {
      Partner.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
      Partner.hasMany(db.Hotel, { foreignKey: 'partnerId', as: 'hotels' });
    }
  }

  Partner.init({
    userId: { type: DataTypes.INTEGER, primaryKey: true },
    companyName: { type: DataTypes.STRING(255), allowNull: false },
    taxCode: { type: DataTypes.STRING(100), allowNull: false },
    businessLicense: { type: DataTypes.TEXT, allowNull: false },
  }, {
    sequelize,
    modelName: 'Partner',
    tableName: 'partners',
    timestamps: false,
  });

  return Partner;
};