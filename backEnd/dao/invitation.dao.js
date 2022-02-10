const Invitation = require('../model/invitation');
const Event = require('../model/event');
const User = require('../model/user')

var invitationDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    findInvitationsResponse:findInvitationsResponse,
    findInvitationsResponseByStatus:findInvitationsResponseByStatus,
    updateInvitation: updateInvitation,
    findEventsByEventId: findEventsByEventId
}

function findAll() {
    return Invitation.findAll();
}


function findById(id) {
    return Invitation.findByPk(id);
}

function deleteById(id) {
    return Invitation.destroy({ where: { id: id } });
}

// function create(invitation) {
//     //var newInvitation = new Invitation(invitation);
//     return Invitation.create({invitation});
//     //return newInvitation.save();
// }

function create(invitation) {
   var data = Invitation.bulkCreate(invitation, {returning: true});
   return data;
}

// const create = await Invitation.create(invitation)


function findInvitationsResponse(isActive,userId){
    return Invitation.findAll({ 
        where: { 
            userId : userId
        },
        include : [{
            model : Event,
            where:{
                isActive : isActive
            }
        }]
    });
}


function findInvitationsResponseByStatus(isActive,invitationResponse,userId){
    return Invitation.findAll({ 
        where: { 
            
            invitationResponse :  invitationResponse,
            userId : userId
        },
        include : [{
            model : Event,
            where:{
                isActive : isActive
            }
        }]
    });
}

function updateInvitation(invitation, id) {
    var updateInvitation = {
        invitation_response: invitation.invitation_response,
        invitation_cancellation_reason : invitation.invitation_cancellation_reason
    };
    return Invitation.update(updateInvitation, { where: { id: id } });
}

function findEventsByEventId(eventid) {
    return Invitation.findAll({
        where: { eventId: eventid },
        include: [{
            model: User
        }]
    })
}

module.exports = invitationDao;