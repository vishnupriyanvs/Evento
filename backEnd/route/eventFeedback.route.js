const express = require('express');
const router = express.Router();
const eventFeedbackController = require('../controller/eventFeedback.controller');
const authenticateToken = require('../middleware/user.middleware')

router.post('/',authenticateToken(['Admin']), eventFeedbackController.addEventFeedback);
router.get('/', authenticateToken(['Admin','Employee']),eventFeedbackController.findEventFeedbacks);
router.get('/:id',authenticateToken(['Admin']), eventFeedbackController.findEventFeedbackById);
router.put('/:id',authenticateToken(['Admin']), eventFeedbackController.updateEventFeedback);
router.delete('/:id',authenticateToken(['Admin']), eventFeedbackController.deleteById);


module.exports = router;
