const userRoleDao = require('../dao/userRole.dao');


var userRoleController = {
    addUserRole: addUserRole,
    findUserRoles: findUserRoles,
    findUserRoleById: findUserRoleById,
    updateUserRole: updateUserRole,
    deleteById: deleteById,
}

async function addUserRole(req, res) {
    let userRole = req.body;
    
    userRoleDao.create(userRole).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUserRoleById(req, res) {
    userRoleDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    userRoleDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "UserRole deleted successfully",
                userRole: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateUserRole(req, res) {
    userRoleDao.updateUserRole(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "UserRole updated successfully",
                userRole: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUserRoles(req, res) {
    userRoleDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = userRoleController;