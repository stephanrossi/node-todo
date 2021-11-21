import { Model, DataTypes } from "sequelize"
import { sequelize } from "../config/postgres"

export interface TodoConfig extends Model {
  id: number
  title: string
  done: boolean
}

export const Todo = sequelize.define<TodoConfig>(
  "Todo",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "todos",
    timestamps: true,
  }
)
