import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize(
  process.env.PG_DB as string,
  process.env.PG_USER as string,
  process.env.PG_PASSWORD as string,
  {
    host: "localhost",
    dialect: "postgres",
    port: parseInt(process.env.PG_PORT as string),
    timezone: "-03:00",
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso")
  })
  .catch((error) => {
    console.log("Falha na conexão com o banco de dados" + error)
  })
