const Sequelize = require('sequelize');
const Db = require('../config/database');

// const User = require('./user');

const Role = Db.define('role', {
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



// Role.belongsToMany(User, { through: 'user_roles' });

module.exports = Role;