import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

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