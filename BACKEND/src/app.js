const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());



connectDB().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Database connection error:', err);
});

module.exports = { app };