const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    targetType: {
        type: DataTypes.ENUM('all', 'group', 'user'),
        allowNull: false
    },
    targetId: {
        type: DataTypes.INTEGER,  // Nếu targetType là "user" hoặc "group", targetId là ID tương ứng
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Notification;
