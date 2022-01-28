const Sequelize = require('sequelize');
const Db = require('../config/database');
// const user = require('./user');

const JobTitle = Db.define('jobTitle', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
},
    { underscored: true, timestamps: false }
);
// JobTitle.hasMany(user)

module.exports = JobTitle;