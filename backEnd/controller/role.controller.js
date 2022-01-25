const roleDao = require('../dao/role.dao');


var roleController = {
    addRole: addRole,
    findRoles: findRoles,
    findRoleById: findRoleById,
    updateRole: updateRole,
    deleteById: deleteById,
}

async function addRole(req, res) {
    let role = req.body;
    
    roleDao.create(role).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findRoleById(req, res) {
    roleDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    roleDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Role deleted successfully",
                role: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateRole(req, res) {
    roleDao.updateRole(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Role updated successfully",
                role: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findRoles(req, res) {
    roleDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = roleController;