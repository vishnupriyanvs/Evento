const Sequelize = require('sequelize');
const db = require('../config/database');

const user = require('./user')
const role = require('./role')

const user_role = db.define('user_role', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    role_id: {
        type: Sequelize.SMALLINT,
        allowNull: false
    }
});

role.hasMany(user_role)
user.hasOne(user_role)

module.exports = user_role;