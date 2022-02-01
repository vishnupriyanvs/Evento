const Event = require('../model/event');
var eventDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateEvent: updateEvent
}

function findAll() {
    return Event.findAll();
}


function findById(id) {
    return Event.findByPk(id);
}

function deleteById(id) {
    return Event.destroy({ where: { id: id } });
}

function create(event) {
    var newEvent = new Event(event);
    return newEvent.save();
}

function updateEvent(event, id) {
    var updateEvent = {
        invitation_response: event.invitation_response,
        invitation_cancellation_reason : event.invitation_cancellation_reason
    };
    return Event.update(updateEvent, { where: { id: id } });
}
module.exports = eventDao;