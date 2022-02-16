const Sequelize = require('sequelize');
const Db = require('../config/database');
// const user = require('./user'); 

const Location = Db.define('location', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
},
    {
        timestamps: false
    });

// Location.hasMany(user)

module.exports = Location;