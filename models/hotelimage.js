'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class HotelImage extends Model {
    static associate(db) {
      HotelImage.belongsTo(db.Hotel, { foreignKey: 'hotelId', as: 'hotel' });
    }
  }

  HotelImage.init({
    id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hotelId:   { type: DataTypes.INTEGER, allowNull: false },
    imageUrl:  { type: DataTypes.STRING(255), allowNull: false },
    isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    sequelize,
    modelName: 'HotelImage',
    tableName: 'hotelimages',
    timestamps: false,
  });

  return HotelImage;
};