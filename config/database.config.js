import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Print environment variables for debugging
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_DIALECT:", process.env.DB_DIALECT);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        define: {
            underscored: true,
            freezeTableName: true,
        },
        logging: false,
    });

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: process.env.SEQUELIZE_FORCE, alter: process.env.SEQUELIZE_ALTER });
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
};

connectToDatabase();


export default sequelize;