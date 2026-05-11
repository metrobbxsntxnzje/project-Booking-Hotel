'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PartnerRequest extends Model {
        static associate(db) {
            PartnerRequest.belongsTo(db.User, { foreignKey: 'userId', as: 'requester' });
            PartnerRequest.belongsTo(db.User, { foreignKey: 'reviewedBy', as: 'reviewer' });
        }
    }

    PartnerRequest.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        companyName: { type: DataTypes.STRING(255), allowNull: false },
        taxCode: { type: DataTypes.STRING(100), allowNull: false },
        businessLicense: { type: DataTypes.TEXT('long'), allowNull: false },
        status: {
            type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
            allowNull: false,
            defaultValue: 'PENDING',
        },
        adminNote: { type: DataTypes.TEXT, allowNull: true },
        reviewedBy: { type: DataTypes.INTEGER, allowNull: true },
        reviewedAt: { type: DataTypes.DATE, allowNull: true },
    }, {
        sequelize,
        modelName: 'PartnerRequest',
        tableName: 'partner_requests',
        timestamps: true,
        updatedAt: false,
    });

    return PartnerRequest;
};