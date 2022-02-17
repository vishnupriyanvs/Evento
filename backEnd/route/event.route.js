const express = require('express');
const router = express.Router();
const eventController = require('../controller/event.controller');
const authenticateToken = require('../middleware/user.middleware');

router.post('/',authenticateToken(['Admin']), eventController.addEvent);
router.get('/',authenticateToken(['Admin', 'Employee']), eventController.findEvents);
router.get('/:id',authenticateToken(['Admin','Employee']), eventController.findEventById);
router.put('/:id',authenticateToken(['Admin']), eventController.updateEvent);
//router.delete('/:id', authenticateToken(['Admin']),eventController.deleteById);

router.get('/status/:is_active',authenticateToken(['Admin','Employee']),eventController.findByEventStatus);
router.put('/:id/:isActive',authenticateToken(['Admin']),eventController.updateEventStatus);

router.get('/calendar/:id', authenticateToken(['Admin','Employee']),eventController.findEventForUserCalendar);
router.put('/cancellation/reason/:id',authenticateToken(['Admin','Employee']), eventController.updateEventCancellation);

module.exports = router;
