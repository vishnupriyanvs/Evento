const Sequelize = require('sequelize');
const Db = require('../config/database');

const department = require('./department')
const grade = require('./grade')
const jobTitle = require('./jobTitle')
const location = require('./location')

const user = Db.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Transgender', 'Prefer Not to Respond'),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate : {
            isEmail : true
        }
    },
    contact: {
        type: Sequelize.STRING,
        allowNull: false,
        validate : {
            isNumeric : true,
            len : [10]
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    jobTitleId: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references: { model: 'job_titles', key: 'id' }
    },
    gradeId: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references: { model: 'grades', key: 'id' }
    },
    locationId: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references: { model: 'locations', key: 'id' }
    },
    departmentId: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references: { model: 'departments', key: 'id' }
    }
},
    {
        initialAutoIncrement: 1000,
        underscored: true,
        timestamps: false
    }
);


department.hasMany(user)
grade.hasMany(user)
jobTitle.hasMany(user)
location.hasMany(user)

module.exports = user;