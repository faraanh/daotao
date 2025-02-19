const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Form = require('./Form');
const User = require('./User');

const FormResponse = sequelize.define('FormResponse', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    formId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Form, key: 'id' } },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    responseData: { type: DataTypes.JSON, allowNull: false }
});

module.exports = FormResponse;
