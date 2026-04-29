'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomConfiguration extends Model {
    static associate(db) {
      RoomConfiguration.belongsTo(db.Hotel,    { foreignKey: 'hotelId',    as: 'hotel' });
      RoomConfiguration.belongsTo(db.RoomType, { foreignKey: 'roomTypeId', as: 'roomType' });

      RoomConfiguration.hasMany(db.PhysicalRoom,  { foreignKey: 'roomConfigId', as: 'physicalRooms' });
      RoomConfiguration.hasMany(db.RoomInventory, { foreignKey: 'roomConfigId', as: 'inventory' });
      RoomConfiguration.hasMany(db.RoomPrice,     { foreignKey: 'roomConfigId', as: 'prices' });
      RoomConfiguration.hasMany(db.RoomImage,     { foreignKey: 'roomConfigId', as: 'images' });
      RoomConfiguration.hasMany(db.BookingDetail, { foreignKey: 'roomConfigId', as: 'bookingDetails' });

      RoomConfiguration.belongsToMany(db.Amenity, {
        through: db.RoomAmenity,
        foreignKey: 'roomConfigId',
        otherKey: 'amenityId',
        as: 'amenities',
      });

      RoomConfiguration.belongsToMany(db.BedType, {
        through: db.RoomConfigurationBedType,
        foreignKey: 'roomConfigId',
        otherKey: 'bedTypeId',
        as: 'bedTypes',
      });
    }
  }

  RoomConfiguration.init({
    id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hotelId:    { type: DataTypes.INTEGER, allowNull: false },
    roomTypeId: { type: DataTypes.INTEGER, allowNull: false },
    basePrice:  { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    area:       { type: DataTypes.INTEGER },
    maxPeople:  { type: DataTypes.INTEGER },
    deleted_at: { type: DataTypes.DATE },
  }, {
    sequelize,
    modelName: 'RoomConfiguration',
    tableName: 'roomconfigurations',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
    defaultScope: {
      where: { deleted_at: null },
    },
    scopes: {
      withDeleted: {},
    },
  });

  return RoomConfiguration;
};