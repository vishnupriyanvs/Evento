const Sequelize = require('sequelize');
const Db = require('../config/database');

const location = Db.define('location', {
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