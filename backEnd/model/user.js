const Sequelize = require('sequelize');
const db = require('../config/database');

const department = require('./department')
const grade = require('./grade')
const job_title = require('./job_title')
const location = require('./location')

const user = db.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.ENUM,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contact: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    job_title_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references : {model : 'job_title', key : 'id'}
    },
    grade_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references : {model : 'grade', key : 'id'}
    },
    location_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references : {model : 'location', key : 'id'}
    },
    department_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references : {model : 'department' ,key : 'id'}
    }
},
{initialAutoIncrement : 1000}
);


department.hasMany(user)
grade.hasMany(user)
job_title.hasMany(user)
location.hasMany(user)

module.exports = user;