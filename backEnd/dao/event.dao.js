const Event = require('../model/event');
const Invitation = require('../model/invitation');
const User = require('../model/user');

var eventDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateEvent: updateEvent,

    findByEventStatus : findByEventStatus,
    updateEventStatus : updateEventStatus,
    updateEventCancellation:updateEventCancellation,
    findEventForUserCalendar : findEventForUserCalendar,
    addImageUrl : addImageUrl
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

////////////////////////

function findByEventStatus(isActive){
    return Event.findAll({ 
        where: { isActive :  isActive},
        attributes: ['id','title', 'start_date','end_date','is_active','cancellation_reason']
    });
}

function updateEventStatus(isActive, id) {
    var updateEvent = {
        isActive : isActive,
    };
    return Event.update(updateEvent, { where: { id: id } });
}

function updateEventCancellation(cancellationReason, id, isActive) {
    var updateEvent = {
        cancellationReason : cancellationReason,
        isActive : isActive,
    };
    return Event.update(updateEvent, { where: { id: id } });
}

function findEventForUserCalendar(id){
    return Event.findAll({ 
        include : [{
            model : Invitation,
            where: { user_id : id}
        }],
        attributes: ['id','title', 'startDate','endDate','startTime','endTime','isActive']
    });
}

function addImageUrl(id, link){

    var updateEvent = {
        imageUrl: link
    }
    return Event.update(updateEvent, {where: {id: id}})
}

module.exports = eventDao;


