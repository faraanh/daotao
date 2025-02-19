const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Notification = require('./Notification');
const User = require('./User');

const Response = sequelize.define('Response', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    notificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Notification, key: 'id' }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' }
    },
    content: {
        type: DataTypes.TEXT,  // Nội dung phản hồi (nếu có)
        allowNull: true
    },
    no_data: {
        type: DataTypes.BOOLEAN,  // Nếu user chọn "Không có thông tin"
        defaultValue: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Response;
