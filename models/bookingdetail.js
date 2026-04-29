'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookingDetail extends Model {
    static associate(db) {
      BookingDetail.belongsTo(db.Booking,           { foreignKey: 'bookingId',    as: 'booking' });
      BookingDetail.belongsTo(db.RoomConfiguration, { foreignKey: 'roomConfigId', as: 'roomConfiguration' });
      BookingDetail.belongsTo(db.PhysicalRoom,      { foreignKey: 'physicalRoomId', as: 'physicalRoom' });
      BookingDetail.hasOne(db.Review,               { foreignKey: 'bookingDetailId', as: 'review' });
    }
  }

  BookingDetail.init({
    id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bookingId:      { type: DataTypes.INTEGER, allowNull: false },
    roomConfigId:   { type: DataTypes.INTEGER, allowNull: false },
    physicalRoomId: { type: DataTypes.INTEGER },
    checkIn:        { type: DataTypes.DATEONLY, allowNull: false },
    checkOut:       { type: DataTypes.DATEONLY, allowNull: false },
    quantity:       { type: DataTypes.INTEGER, allowNull: false },
    price:          { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    amount:         { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  }, {
    sequelize,
    modelName: 'BookingDetail',
    tableName: 'bookingdetails',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
  });

  return BookingDetail;
};