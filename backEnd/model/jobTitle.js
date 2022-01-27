const Sequelize = require('sequelize');
const Db = require('../config/database');

const JobTitle = Db.define('jobTitle', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{ underscored: true }
);

module.exports = JobTitle;