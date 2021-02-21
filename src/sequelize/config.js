const { Sequelize } = require('sequelize')
require('dotenv').config()

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.BD_PASSWORD,
  {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database/database.sqlite',
  }
)
