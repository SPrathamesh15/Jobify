const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const password = process.env.MONGODB_PASSWORD;
console.log('passowrd',password)
const mongodbUrl = `mongodb+srv://sprathamesh354:${password}@cluster0.irq25.mongodb.net/`;

async function connectDB() {
    try {
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

module.exports = { connectDB };
