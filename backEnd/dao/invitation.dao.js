const Invitation = require('../model/invitation');
var invitationDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateInvitation: updateInvitation
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

function updateInvitation(invitation, id) {
    var updateInvitation = {
        invitation_response: invitation.invitation_response,
        invitation_cancellation_reason : invitation.invitation_cancellation_reason
    };
    return Invitation.update(updateInvitation, { where: { id: id } });
}
module.exports = invitationDao;