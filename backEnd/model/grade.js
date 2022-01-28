const Sequelize = require('sequelize');
const Db = require('../config/database');
// const user = require('./user');

const Grade = Db.define('grade', {
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
    
// Grade.hasMany(user)

module.exports = Grade;