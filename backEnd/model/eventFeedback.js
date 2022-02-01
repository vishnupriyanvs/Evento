const Sequelize = require('sequelize');
const Db = require('../config/database');

const Invitation = require('./invitation')

const EventFeedback = Db.define('eventFeedback', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    feedback: {
        type : Sequelize.TEXT,
        allowNull: true
    },
    rating: {
        type : Sequelize.SMALLINT,
        allowNull: true
    }
},
    {
        timestamps: false,
        underscored: true
    });


EventFeedback.belongsTo(Invitation)
Invitation.hasOne(EventFeedback)

module.exports = EventFeedback;