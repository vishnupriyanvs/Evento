const Sequelize = require('sequelize');
const Db = require('../config/database');

const user = require('./user')
const role = require('./role')

const userRole = Db.define('userRole', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references : {model:'users', key : 'id'}
    },
    roleID: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references : {model : 'roles' , key : 'id'}
    }
},
{ underscored: true }
);

role.hasMany(userRole)
user.hasOne(userRole)

module.exports = userRole;