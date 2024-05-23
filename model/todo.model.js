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
