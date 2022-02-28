const EventFeedback = require('../model/eventFeedback');
var eventFeedbackDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateEventFeedback: updateEventFeedback
}

function findAll() {
    return EventFeedback.findAll();
}


function findById(id) {
    return EventFeedback.findOne({where:{invitationId:id}});
}

function deleteById(id) {
    return EventFeedback.destroy({ where: { id: id } });
}

function create(eventFeedback) {
    var newEventFeedback = new EventFeedback(eventFeedback);
    return newEventFeedback.save();
}

function updateEventFeedback(eventFeedback, id) {
    var updateEventFeedback = {
        feedback: eventFeedback.feedback,
        rating : eventFeedback.rating
    };
    return EventFeedback.update(updateEventFeedback, { where: { id: id } });
}
module.exports = eventFeedbackDao;