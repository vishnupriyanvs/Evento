const invitationDao = require('../dao/invitation.dao');


var invitationController = {
    addInvitation: addInvitation,
    findInvitations: findInvitations,
    findInvitationById: findInvitationById,
    findInvitationsByEventId: findInvitationsByEventId,
    updateInvitation: updateInvitation,
    deleteById: deleteById,
    findInvitationsResponseByStatus:findInvitationsResponseByStatus,
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
    
    invitationDao.updateInvitation(req.body.invitationResponse,req.body.invitationCancelReason ? req.body.invitationCancelReason : null ,req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Invitation updated successfully",
                invitation: data
            })
        })
        .catch((error) => {
            res.send("Please submit the cancellation reason")
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
    invitationDao.findInvitationsResponse(req.params.is_active,req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findInvitationsResponseByStatus(req, res) {
    invitationDao.findInvitationsResponseByStatus(req.params.is_active,req.params.invitation_response,req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



function findInvitationsByEventId(req, res) {
    const eventid = req.params.eventid;
    console.log(eventid)
    invitationDao.findEventsByEventId(eventid).then((data) => {
        res.send(data)
    })
        .catch(err => {
            res.send(err);
            // console.log(err);
        })
}


module.exports = invitationController;