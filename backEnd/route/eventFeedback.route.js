const express = require('express');
const router = express.Router();
const eventFeedbackController = require('../controller/eventFeedback.controller');

router.post('/', eventFeedbackController.addEventFeedback);
router.get('/', eventFeedbackController.findEventFeedbacks);
router.get('/:id', eventFeedbackController.findEventFeedbackById);
router.put('/:id', eventFeedbackController.updateEventFeedback);
router.delete('/:id', eventFeedbackController.deleteById);


module.exports = router;
