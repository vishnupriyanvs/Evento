const Sequelize = require('sequelize');
const Db = require('../config/database');

const Department = require('./department')
const Grade = require('./grade')
const JobTitle = require('./jobTitle')
const Location = require('./location');
const Role = require('./role');


const User = Db.define('user', {
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
},
    {
        initialAutoIncrement: 1000,
        underscored: true,
        timestamps: false
    }
);


User.belongsTo(Department);
Department.hasMany(User);

User.belongsTo(Grade);
Grade.hasMany(User);

User.belongsTo(JobTitle);
JobTitle.hasMany(User)

User.belongsTo(Location);
Location.hasMany(User);


User.belongsToMany(Role, {through: 'user_roles' });
Role.belongsToMany(User, { through: 'user_roles' });


module.exports = User;