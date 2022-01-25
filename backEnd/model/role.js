const Sequelize = require('sequelize');
const db = require('../config/database');

const role = db.define('role', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

module.exports = role;