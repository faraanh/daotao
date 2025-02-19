const User = require('./User');
const Notification = require('./Notification');
const Form = require('./Form');
const FormField = require('./FormField');
const FormResponse = require('./FormResponse');

// Xác định quan hệ giữa các bảng
Form.hasMany(FormField, { foreignKey: 'formId', onDelete: 'CASCADE' });
FormField.belongsTo(Form, { foreignKey: 'formId' });

Form.hasMany(FormResponse, { foreignKey: 'formId', onDelete: 'CASCADE' });
FormResponse.belongsTo(Form, { foreignKey: 'formId' });

User.hasMany(FormResponse, { foreignKey: 'userId', onDelete: 'CASCADE' });
FormResponse.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Notification, Form, FormField, FormResponse };
