const sequelize = require('sequelize');
const dbConfig = {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

const db = new sequelize(
    process.env.DB_SCHEMA,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    dbConfig
);

module.exports = db;