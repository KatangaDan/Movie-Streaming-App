import express from 'express';
import * as authController from '../controllers/authController.js'
const router = express.Router();

// Define your routes here
router.post("/register", authController.register);

// ...other routes...

export default router;