import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/public',express.static(path.join(__dirname, 'public')));

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
