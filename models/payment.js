'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(db) {
      Payment.belongsTo(db.Booking, { foreignKey: 'bookingId', as: 'booking' });
    }
  }

  Payment.init({
    id:                    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bookingId:             { type: DataTypes.INTEGER, allowNull: false },
    amount:                { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    paymentMethod:         { type: DataTypes.STRING(50) },
    paymentStatus:         {
      type: DataTypes.ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED'),
    },
    externalTransactionId: { type: DataTypes.STRING(255) },
    paidAt:                { type: DataTypes.DATE },
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
  });

  return Payment;
};