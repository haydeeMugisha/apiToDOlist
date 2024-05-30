import winston from "winston";
import path from "path";

const logErrorFilePath = process.env.LOG_ERROR_FILE_PATH || path.join(__dirname, '../logs/error.log');
const logCombinedFilePath = process.env.LOG_COMBINED_FILE_PATH || path.join(__dirname, '../logs/combined.log');


const logger = winston.createLogger({
  level: process.env.LOGGING_LEVEL || 'info',
  format: winston.format.json(),
  defaultMeta: { service: process.env.LOGGING_SERVICE_LABEL || 'app-service' },
  transports: [
    new winston.transports.File({ filename: logErrorFilePath, level: 'error' }),
    new winston.transports.File({ filename: logCombinedFilePath }),
  ],
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.json(),
  }));
}

export default logger;