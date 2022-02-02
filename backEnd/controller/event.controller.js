const eventDao = require('../dao/event.dao');


var eventController = {
    addEvent: addEvent,
    findEvents: findEvents,
    findEventById: findEventById,
    updateEvent: updateEvent,
    deleteById: deleteById,

    findByEventStatus : findByEventStatus
}

async function addEvent(req, res) {
    let event = req.body;
    console.log(event)
    eventDao.create(event).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEventById(req, res) {
    eventDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    eventDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Event deleted successfully",
                event: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateEvent(req, res) {
    eventDao.updateEvent(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Event updated successfully",
                event: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEvents(req, res) {
    eventDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


//////////////////////////////

function findByEventStatus(req, res) {
    console.log(req.params.is_active)
    eventDao.findByEventStatus(req.params.is_active).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = eventController;