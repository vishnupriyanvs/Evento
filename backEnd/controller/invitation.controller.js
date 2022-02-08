const invitationDao = require('../dao/invitation.dao');


var invitationController = {
    addInvitation: addInvitation,
    findInvitations: findInvitations,
    findInvitationById: findInvitationById,
    updateInvitation: updateInvitation,
    deleteById: deleteById,
    findInvitationsResponse:findInvitationsResponse,
}

async function addInvitation(req, res) {
    let invitation = req.body;
    
    invitationDao.create(invitation)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findInvitationById(req, res) {
    invitationDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    invitationDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Invitation deleted successfully",
                invitation: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateInvitation(req, res) {
    invitationDao.updateInvitation(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Invitation updated successfully",
                invitation: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findInvitations(req, res) {
    invitationDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findInvitationsResponse(req, res) {
    invitationDao.findInvitationsResponse(req.params.invitation_response,req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


module.exports = invitationController;