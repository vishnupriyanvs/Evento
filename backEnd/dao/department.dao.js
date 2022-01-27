const Department = require('../model/department');
var departmentDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateDepartment: updateDepartment
}

function findAll() {
    return Department.findAll();
}


function findById(id) {
    return Department.findByPk(id);
}

function deleteById(id) {
    return Department.destroy({ where: { id: id } });
}

function create(department) {
    var newDepartment = new Department(department);
    return newDepartment.save();
}

function updateDepartment(department, id) {
    var updateDepartment = {
        name: department.name
    };
    return Department.update(updateDepartment, { where: { id: id } });
}
module.exports = departmentDao;