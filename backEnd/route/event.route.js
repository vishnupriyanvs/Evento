const express = require('express');
const router = express.Router();
const eventController = require('../controller/event.controller');

router.post('/', eventController.addEvent);
router.get('/', eventController.findEvents);
router.get('/:id', eventController.findEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteById);

router.get('/status/:is_active',eventController.findByEventStatus);
router.put('/:id/:isActive',eventController.updateEventStatus);

router.get('/calendar/:id', eventController.findEventForUserCalendar);
router.put('/cancellation/reason/:id', eventController.updateEventCancellation);

module.exports = router;
