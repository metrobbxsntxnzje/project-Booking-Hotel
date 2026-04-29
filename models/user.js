'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(db) {
      User.belongsTo(db.City, { foreignKey: 'cityId', as: 'city' });
      User.belongsTo(db.Ward, { foreignKey: 'wardId', as: 'ward' });
      User.hasOne(db.Partner, { foreignKey: 'userId', as: 'partnerProfile' });
      User.hasMany(db.Booking, { foreignKey: 'userId', as: 'bookings' });
      User.hasMany(db.Review, { foreignKey: 'userId', as: 'reviews' });
      User.hasMany(db.AuditLog, { foreignKey: 'userId', as: 'auditLogs' });
    }
  }

  User.init({
    id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullName:  { type: DataTypes.STRING(255), allowNull: false },
    email:     { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password:  { type: DataTypes.STRING(255), allowNull: false },
    phone:     { type: DataTypes.STRING(20) },
    status:    {
      type: DataTypes.ENUM('ACTIVE', 'PENDING', 'BLOCKED'),
      allowNull: false,
    },
    address:   { type: DataTypes.STRING(255) },
    gender:    { type: DataTypes.STRING(10) },
    birthDate: { type: DataTypes.DATEONLY },
    avatarUrl: { type: DataTypes.STRING(255) },
    cityId:    { type: DataTypes.INTEGER },
    wardId:    { type: DataTypes.INTEGER },
    role:      {
      type: DataTypes.ENUM('Admin', 'Customer', 'Partner', 'Staff'),
      defaultValue: 'Customer',
    },
    created_by: { type: DataTypes.INTEGER },
    hotel_id:   { type: DataTypes.INTEGER },
    deletedAt:  { type: DataTypes.DATE },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
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

  return User;
};