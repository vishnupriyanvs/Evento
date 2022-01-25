const departmentDao = require('../dao/department.dao');


var departmentController = {
    addDepartment: addDepartment,
    findDepartments: findDepartments,
    findDepartmentById: findDepartmentById,
    updateDepartment: updateDepartment,
    deleteById: deleteById,
}

async function addDepartment(req, res) {
    let department = req.body;
    
    departmentDao.create(department).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findDepartmentById(req, res) {
    departmentDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    departmentDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Department deleted successfully",
                department: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateDepartment(req, res) {
    departmentDao.updateDepartment(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Department updated successfully",
                department: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findDepartments(req, res) {
    departmentDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = departmentController;