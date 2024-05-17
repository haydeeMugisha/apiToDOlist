// Import necessary modules
import express from "express";
import authService from "../service/auth.service.js";
import { verifyToken } from "../utility/auth.utility.js";
import logger from "../config/log.config.js";

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    logger.info('Registering user...', req.body.email);
    const user = req.body;
    try {
        await authService.register(user);
        logger.info('User has registered successfully', req.body.email);
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        logger.error('Registration failed', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await authService.login(email, password);
        if (!user || !token) {
            throw new Error('Authentication failed');  // Failsafe error
        }
        res.json({ message: 'Login successful', token: token, user: user });
    } catch (error) {
        logger.error('Login failed', error);
        res.status(401).json({ message: 'Login failed', error: error.message });
    }
});


// Logout user
router.post('/logout', verifyToken, (req, res) => {
    req.session = null;  // Clear the session
    res.json({ message: 'Logout successful' });
});

export { router };
