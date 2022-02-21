const express = require('express');
const router = express.Router();
const invitationController = require('../controller/invitation.controller');
const authenticateToken = require('../middleware/user.middleware');

router.post('/',authenticateToken(['Admin']), invitationController.addInvitation);
router.get('/',authenticateToken(['Admin']), invitationController.findInvitations);
router.get('/:id', authenticateToken(['Admin','Employee']),invitationController.findInvitationById);
router.get('/event/:eventid',authenticateToken(['Admin','Employee']), invitationController.findInvitationsByEventId)
router.put('/:id', authenticateToken(['Admin','Employee']),invitationController.updateInvitation);
//router.delete('/:id',authenticateToken(['Admin']), invitationController.deleteById);

router.get('/response/:is_active/:invitation_response/:id',authenticateToken(['Admin','Employee']),invitationController.findInvitationsResponseByStatus);
router.get('/response/:is_active/:id',authenticateToken(['Admin','Employee']),invitationController.findInvitationsResponse);

// router.put('/:invitation_response/:id', invitationController.updateInvitation);

module.exports = router;
