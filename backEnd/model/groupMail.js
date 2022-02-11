const Sequelize = require('sequelize');
const Db = require('../config/database');
// const user = require('./user');

const GroupMails = Db.define('groupMail', {
    id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    mail : {
        type : Sequelize.STRING,
        allowNull : true,
        unique : true
    }

},
    {
        timestamps: false,
        underscored: true
    });

// User.belongsTo(Location);
// Location.hasMany(User);


module.exports = GroupMails;