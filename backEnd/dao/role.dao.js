const Role = require('../model/role');
var roleDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateRole: updateRole
}

function findAll() {
    return Role.findAll();
}


function findById(id) {
    return Role.findByPk(id);
}

function deleteById(id) {
    return Role.destroy({ where: { id: id } });
}

function create(role) {
    var newRole = new Role(role);
    return newRole.save();
}

function updateRole(role, id) {
    var updateRole = {
        type: role.type,
        description : role.description
    };
    return Role.update(updateRole, { where: { id: id } });
}
module.exports = roleDao;