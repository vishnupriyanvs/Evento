const UserRole = require('../model/userRole');
var userRoleDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUserRole: updateUserRole
}

function findAll() {
    return UserRole.findAll();
}


function findById(id) {
    return UserRole.findByPk(id);
}

function deleteById(id) {
    return UserRole.destroy({ where: { id: id } });
}

function create(userRole) {
    var newUserRole = new UserRole(userRole);
    return newUserRole.save();
}

function updateUserRole(userRole, id) {
    var updateUserRole = {
        //user_id: userRole.user_id,
        roleId : userRole.roleId
    };
    return UserRole.update(updateUserRole, { where: { id: id } });
}
module.exports = userRoleDao;