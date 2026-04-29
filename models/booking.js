'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(db) {
      Booking.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
      Booking.hasMany(db.BookingDetail, { foreignKey: 'bookingId', as: 'details' });
      Booking.hasMany(db.Payment,       { foreignKey: 'bookingId', as: 'payments' });
    }
  }

  Booking.init({
    id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId:         { type: DataTypes.INTEGER, allowNull: false },
    status:         {
      type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'),
      allowNull: false,
      defaultValue: 'PENDING',
    },
    source:         {
      type: DataTypes.ENUM('WEBSITE', 'BOOKING_DOT_COM', 'EXPEDIA', 'DIRECT'),
      allowNull: false,
      defaultValue: 'WEBSITE',
    },
    totalAmount:    { type: DataTypes.DECIMAL(12, 2) },
    platformFee:    { type: DataTypes.DECIMAL(12, 2) },
    partnerRevenue: { type: DataTypes.DECIMAL(12, 2) },
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
  });

  return Booking;
};