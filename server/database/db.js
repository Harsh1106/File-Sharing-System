import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const DBconnection = async () => {
    const MONGODB_URI = process.env.MONGODB_URI; // Fetch URI from .env file

    if (!MONGODB_URI) {
        console.error('MongoDB URI is missing. Please check your .env file.');
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to database successfully');
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
    }
};

export default DBconnection;
