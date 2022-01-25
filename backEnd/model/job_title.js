const Sequelize = require('sequelize');
const db = require('../config/database');

const job_title = db.define('job_title', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = job_title;