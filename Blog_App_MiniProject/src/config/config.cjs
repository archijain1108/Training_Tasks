const dotenv = require('dotenv')
dotenv.config();


module.exports = {
  "development": {
    "username": process.env.db_username,
    "password": process.env.db_password,
    "database": process.env.db_name,
    "host": process.env.db_host,
    "port" : process.env.db_port,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
