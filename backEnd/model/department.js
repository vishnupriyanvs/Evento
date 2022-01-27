const Sequelize = require('sequelize');
const Db = require('../config/database');

const Department = Db.define('department', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

},
    {
        timestamps: false
    });

module.exports = Department;