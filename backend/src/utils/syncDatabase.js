const sequelize = require('../config/database');
const { User, Notification, Form, FormField, FormResponse } = require('../models');

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true }); // 🔹 Cập nhật cấu trúc bảng nếu có thay đổi
        console.log('✅ Database synced successfully.');
        process.exit();
    } catch (error) {
        console.error('❌ Error syncing database:', error);
        process.exit(1);
    }
}

syncDatabase();
