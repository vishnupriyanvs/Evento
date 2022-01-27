const Sequelize = require('sequelize');
const Db = require('../config/database');

const Grade = Db.define('grade', {
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

module.exports = Grade;