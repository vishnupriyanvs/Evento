const Sequelize = require('sequelize');
const Db = require('../config/database');

const role = Db.define('role', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }
},
    {
        timestamps: false
    });

module.exports = role;