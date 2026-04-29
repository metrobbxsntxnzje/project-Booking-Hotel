'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {
    static associate(db) {
      AuditLog.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  AuditLog.init({
    id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId:   { type: DataTypes.INTEGER },
    action:   { type: DataTypes.STRING(255) },
    entity:   { type: DataTypes.STRING(100) },
    entityId: { type: DataTypes.INTEGER },
  }, {
    sequelize,
    modelName: 'AuditLog',
    tableName: 'auditlogs',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
  });

  return AuditLog;
};