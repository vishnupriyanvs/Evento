const Sequelize = require('sequelize');
const db = require('../config/database');

const department = db.define('department', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = department;