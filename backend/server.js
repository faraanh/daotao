require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');

// 🔹 IMPORT MODELS để Sequelize nhận diện quan hệ trước khi sync database
require('./src/models');  

const authRoutes = require('./src/routes/authRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const responseRoutes = require('./src/routes/responseRoutes');
const formRoutes = require('./src/routes/formRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/forms', formRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// 🔹 Sync database & start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    console.log('✅ Database synchronized successfully.');
    app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
}).catch(err => {
    console.error('❌ Database sync error:', err);
});
