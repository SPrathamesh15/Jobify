const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');

const userRoutes = require('./routes/userRoutes'); 
const adminRoutes = require('./routes/adminRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config()
const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL
app.use(cors({
  origin: FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/admin', adminRoutes)
app.use('/', applicationRoutes)
connectDB().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Database connection error:', err);
});

module.exports = { app };