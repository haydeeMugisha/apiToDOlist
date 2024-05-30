import sequelize from "../config/database.config.js";
import { DataTypes } from "sequelize";

const Todo = sequelize.define("Todo", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motivationalMessage: {
    type: DataTypes.STRING,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  finish_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'todo',
});

export { Todo };
