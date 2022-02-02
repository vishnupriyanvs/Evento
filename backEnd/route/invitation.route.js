const express = require('express');
const router = express.Router();
const eventController = require('../controller/event.controller');

router.post('/', eventController.addEvent);
router.get('/', eventController.findEvents);
router.get('/:id', eventController.findEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteById);

module.exports = router;
