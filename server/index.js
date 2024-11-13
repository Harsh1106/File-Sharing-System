import express from 'express';
import dotenv from 'dotenv'; // Load environment variables
import cors from 'cors';
import router from './routes/routes.js';
import DBconnection from './database/db.js';



dotenv.config(); // Initialize dotenv to use variables in .env file

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS
app.use(cors());

// Use router for routes
app.use('/', router);

// Port configuration with environment variable
const PORT = process.env.PORT || 8000; // This will get the port from .env or default to 8000

// Database connection
DBconnection();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

console.log(process.env.MONGODB_URI);  // Should print the MongoDB URI
console.log(process.env.JWT_SECRET);   // Should print the JWT secret
console.log(process.env.PORT);         // Should print the port