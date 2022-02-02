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
        title: event.title,
        description : event.description,
        image_url : event.image_url,
        start_date : event.start_date,
        end_date : event.end_date,
        venue  : event.venue,
        resource_person : event.resource_person,
        website : event.website,
        is_active : event.is_active,
        cancellation_reason : event.cancellation_reason 
    };
    return Event.update(updateEvent, { where: { id: id } });
}
module.exports = eventDao;