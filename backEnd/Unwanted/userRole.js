const Sequelize = require('sequelize');
const Db = require('../config/database');

const UserRole = Db.define('userRole', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    }
},
{ 
    underscored: true,
    timestamps: false
 }
);



//module.exports = UserRole;