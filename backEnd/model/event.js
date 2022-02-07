const Sequelize = require('sequelize');
const Db = require('../config/database');

const User = require('./user')

const Event = Db.define('event', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type : Sequelize.TEXT,
        allowNull: false
    },
    imageUrl: {
        type : Sequelize.STRING,
        allowNull: true
    },
    startDate: {
        type : Sequelize.DATEONLY,
        allowNull: false,
    },
    endDate: {
        type : Sequelize.DATEONLY,
        allowNull: false
    },
    startTime: {
        type : Sequelize.TIME,
        allowNull: false,
    },
    endTime: {
        type : Sequelize.TIME,
        allowNull: false
    },
    venue: {
        type : Sequelize.TEXT,
        allowNull: false
    },
    resourcePerson: {
        type : Sequelize.STRING,
        allowNull: false
    },
    website: {
        type : Sequelize.STRING,
        allowNull: true
    },
    isActive: {
        type : Sequelize.ENUM('Active','InProgress','Completed','Cancelled'),
        allowNull: false,
        defaultValue : 'Active'
    },
    cancellationReason: {
        type : Sequelize.TEXT,
        allowNull: true
    },  
},
    {
        timestamps: false,
        underscored : true
    });


Event.belongsTo(User,{foreignKey : 'created_by'})
User.hasMany(Event,{foreignKey : 'created_by'})

Event.belongsTo(User,{foreignKey : 'updated_by'})
User.hasMany(Event,{foreignKey : 'updated_by'})


Event.belongsTo(User,{foreignKey : 'contact_person'})
User.hasMany(Event,{foreignKey : 'contact_person'})


module.exports = Event;