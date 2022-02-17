const Sequelize = require('sequelize');
const Db = require('../config/database');
// const user = require('./user');

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
    mail : {
        type : Sequelize.STRING,
        allowNull : true,
        unique : true
    }

},
    {
        timestamps: false
    });

// Department.hasMany(user)

module.exports = Department;