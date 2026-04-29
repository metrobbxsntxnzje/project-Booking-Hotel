'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(db) {
      Review.belongsTo(db.User,          { foreignKey: 'userId',          as: 'user' });
      Review.belongsTo(db.BookingDetail, { foreignKey: 'bookingDetailId', as: 'bookingDetail' });
      Review.belongsTo(db.Hotel,         { foreignKey: 'hotelId',         as: 'hotel' });
    }
  }

  Review.init({
    id:              { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId:          { type: DataTypes.INTEGER, allowNull: false },
    bookingDetailId: { type: DataTypes.INTEGER, allowNull: false },
    rating:          { type: DataTypes.INTEGER },
    content:         { type: DataTypes.TEXT },
    replyContent:    { type: DataTypes.TEXT },
    replyDate:       { type: DataTypes.DATE },
    hotelId:         { type: DataTypes.INTEGER },
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
  });

  return Review;
};