const Sequelize = require('sequelize');
const db = require('../config/database');

const location = db.define('location', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = location;