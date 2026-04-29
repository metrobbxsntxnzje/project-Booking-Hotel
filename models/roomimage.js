'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomImage extends Model {
    static associate(db) {
      RoomImage.belongsTo(db.RoomConfiguration, { foreignKey: 'roomConfigId', as: 'roomConfiguration' });
    }
  }

  RoomImage.init({
    id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomConfigId: { type: DataTypes.INTEGER, allowNull: false },
    imageUrl:     { type: DataTypes.STRING(255), allowNull: false },
    isPrimary:    { type: DataTypes.TINYINT, defaultValue: 0 },
  }, {
    sequelize,
    modelName: 'RoomImage',
    tableName: 'roomimages',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
  });

  return RoomImage;
};