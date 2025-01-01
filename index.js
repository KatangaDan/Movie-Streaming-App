import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoutes from './server/routes/authRoutes.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors()); // Enable all CORS requests
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser()); // Parse cookies

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/auth',authRoutes);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/html/landing.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/html/login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/html/home.html'));
});

app.get('/createUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/html/createUser.html'));
});



mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
