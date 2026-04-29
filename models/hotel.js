'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(db) {
      Hotel.belongsTo(db.Partner, { foreignKey: 'partnerId', as: 'partner' });
      Hotel.belongsTo(db.City,    { foreignKey: 'cityId',    as: 'city' });
      Hotel.belongsTo(db.Ward,    { foreignKey: 'wardId',    as: 'ward' });
      Hotel.hasMany(db.RoomConfiguration, { foreignKey: 'hotelId', as: 'roomConfigurations' });
      Hotel.hasMany(db.HotelImage,        { foreignKey: 'hotelId', as: 'images' });
      Hotel.hasMany(db.Review,            { foreignKey: 'hotelId', as: 'reviews' });
      Hotel.hasMany(db.Voucher,           { foreignKey: 'hotelId', as: 'vouchers' });
    }
  }

  Hotel.init({
    id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    partnerId:   { type: DataTypes.INTEGER, allowNull: false },
    hotelName:   { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    rating:      { type: DataTypes.FLOAT },
    cityId:      { type: DataTypes.INTEGER, allowNull: false },
    wardId:      { type: DataTypes.INTEGER, allowNull: false },
    address:     { type: DataTypes.TEXT, allowNull: false },
    status:      {
      type: DataTypes.ENUM('ACTIVE', 'PENDING_STOP', 'STOPPED'),
      defaultValue: 'ACTIVE',
    },
    deletedAt: { type: DataTypes.DATE },
  }, {
    sequelize,
    modelName: 'Hotel',
    tableName: 'hotels',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
    defaultScope: {
      where: { deletedAt: null },
    },
    scopes: {
      withDeleted: {},
    },
  });

  return Hotel;
};