import jwt from "jsonwebtoken";

import config from "../config/auth.config.js";
import logger from "../config/log.config.js";

const verifyToken = (req, res, next) => {

   // let token = req.session.token;
   let token = req.headers["authorization"];

    if (!token) {
        logger.error('No token provided!');
        return res.status(401).send({
            message: "No token provided!",
        });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }

    jwt.verify(token,
    process.env.JWT_SECRET_KEY,
        (err, decoded) => {
            if (err) {
                logger.error('Unauthorized!');
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            logger.info('User is authorized', req.userId);
            next();
        });
};


export {verifyToken}