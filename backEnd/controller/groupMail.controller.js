const groupMailDao = require('../dao/groupMail.dao');


var groupMailController = {
    addGroupMail: addGroupMail,
    findGroupMails: findGroupMails,
    findGroupMailById: findGroupMailById,
    updateGroupMail: updateGroupMail,
    deleteById: deleteById,
}

async function addGroupMail(req, res) {
    let groupMail = req.body;
    
    groupMailDao.create(groupMail).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findGroupMailById(req, res) {
    groupMailDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    groupMailDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "GroupMail deleted successfully",
                groupMail: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateGroupMail(req, res) {
    groupMailDao.updateGroupMail(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "GroupMail updated successfully",
                groupMail: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findGroupMails(req, res) {
    groupMailDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = groupMailController;