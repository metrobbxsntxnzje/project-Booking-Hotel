'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    static associate(db) {
      Voucher.belongsTo(db.Hotel, { foreignKey: 'hotelId', as: 'hotel' });
    }
  }

  Voucher.init({
    id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code:      { type: DataTypes.STRING(255), allowNull: false, unique: true },
    quantity:  { type: DataTypes.INTEGER, allowNull: false },
    type:      { type: DataTypes.STRING(20), allowNull: false },
    amount:    { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    condition: { type: DataTypes.DECIMAL(12, 2) },
    startDate: { type: DataTypes.DATEONLY },
    endDate:   { type: DataTypes.DATEONLY },
    hotelId:   { type: DataTypes.INTEGER },
  }, {
    sequelize,
    modelName: 'Voucher',
    tableName: 'vouchers',
    timestamps: false,
  });

  return Voucher;
};