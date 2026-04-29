'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PhysicalRoom extends Model {
    static associate(db) {
      PhysicalRoom.belongsTo(db.RoomConfiguration, { foreignKey: 'roomConfigId', as: 'roomConfiguration' });
      PhysicalRoom.hasMany(db.BookingDetail, { foreignKey: 'physicalRoomId', as: 'bookingDetails' });
    }
  }

  PhysicalRoom.init({
    id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomConfigId: { type: DataTypes.INTEGER, allowNull: false },
    roomNumber:   { type: DataTypes.STRING(50), allowNull: false },
    floor:        { type: DataTypes.INTEGER },
    status:       { type: DataTypes.STRING(20) },
    deleted_at:   { type: DataTypes.DATE },
  }, {
    sequelize,
    modelName: 'PhysicalRoom',
    tableName: 'physicalrooms',
    timestamps: false,
    defaultScope: {
      where: { deleted_at: null },
    },
    scopes: {
      withDeleted: {},
    },
  });

  return PhysicalRoom;
};