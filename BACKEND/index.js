const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');

dotenv.config();

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;
app.set('trust proxy', 1);
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());


app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/', applicationRoutes);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = app;
