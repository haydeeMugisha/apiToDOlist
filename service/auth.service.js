import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import config from "../config/auth.config.js";
import logger from "../config/log.config.js";

const register = async ({ email, firstname, lastname, password }) => {
    logger.info(`Registering user... in service ${email}`);
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, firstname, lastname, password: hashedPassword });
        logger.info(`User is registered and activation email sent ${email}`);
        return user;
    } catch (error) {
        logger.error(`Error creating user... ${error.message}`);
        throw new Error('Error creating user');
    }
};

const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            logger.error('User not found');
            throw new Error('User not found');
        }

        // Compare the password using bcrypt
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            logger.error('Invalid Password');
            throw new Error('Invalid Password');
        }

        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
        return {
            token: token,
            user: {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            }
        };
    } catch (error) {
        logger.error(`Login failed: ${error.message}`);
        throw error; // Ensure this error is handled in your route
    }
};

export default { register, login };
