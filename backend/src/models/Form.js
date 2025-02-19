const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Form = sequelize.define('Form', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    notificationId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Form;
