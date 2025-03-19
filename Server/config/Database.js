const mongoose = require('mongoose');
require('dotenv').config();

exports.Connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, 
            connectTimeoutMS: 10000, 
            socketTimeoutMS: 45000, 
        });

        console.log(' Database connection established successfully');
    } catch (err) {
        console.error(' Db connect failed:', err);
        process.exit(1); 
    }
};
