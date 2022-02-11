const GroupMail = require('../model/groupMail');
const JobTitle = require('../model/jobTitle');
const User = require('../model/user');
var groupMailDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateGroupMail: updateGroupMail
}

function findAll() {
    return GroupMail.findAll();
}


function findById(id) {
    return GroupMail.findByPk(id);
}

function deleteById(id) {
    return GroupMail.destroy({ where: { id: id } });
}

function create(groupMail) {
    var newGroupMail = new GroupMail(groupMail);
    return newGroupMail.save();
}

function updateGroupMail(groupMail, id) {
    var updateGroupMail = {
        name: groupMail.name,
        mail : groupMail.mail
    };
    return GroupMail.update(updateGroupMail, { where: { id: id } });
}





module.exports = groupMailDao;