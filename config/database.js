require("dotenv").config();
const { DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    host: "localhost",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
