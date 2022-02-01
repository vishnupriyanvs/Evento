const eventFeedbackDao = require('../dao/eventFeedback.dao');


var eventFeedbackController = {
    addEventFeedback: addEventFeedback,
    findEventFeedbacks: findEventFeedbacks,
    findEventFeedbackById: findEventFeedbackById,
    updateEventFeedback: updateEventFeedback,
    deleteById: deleteById,
}

async function addEventFeedback(req, res) {
    let eventFeedback = req.body;
    
    eventFeedbackDao.create(eventFeedback).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEventFeedbackById(req, res) {
    eventFeedbackDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    eventFeedbackDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "EventFeedback deleted successfully",
                eventFeedback: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateEventFeedback(req, res) {
    eventFeedbackDao.updateEventFeedback(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "EventFeedback updated successfully",
                eventFeedback: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEventFeedbacks(req, res) {
    eventFeedbackDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = eventFeedbackController;