const Sequelize = require('sequelize');
const Db = require('../config/database');

const Event = require('./event')
const User = require('./user')


const Invitation = Db.define('invitation', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    invitationResponse: {
        type : Sequelize.ENUM('Yes','No','NotResponded'),
        allowNull: false,
        defaultValue : 'NotResponded'
    },
    invitationCancelReason : {
        type : Sequelize.TEXT,
        allowNull : true
    }

},
    {
        timestamps: false,
        underscored : true
    });

Invitation.belongsTo(Event)
Event.hasMany(Invitation)

Invitation.belongsTo(User)
User.hasMany(Invitation)



module.exports = Invitation;