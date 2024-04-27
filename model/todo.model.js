import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";

const Todo = sequelize.define("Todo", {
   
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: {
            msg: 'Email is required'
        },
    }
},{
    tableName: 'todo'
});


export {Todo}