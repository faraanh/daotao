const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FormField = sequelize.define('FormField', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    formId: { type: DataTypes.INTEGER, allowNull: false },
    label: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('text', 'number', 'date', 'file'), allowNull: false },
    required: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = FormField;
