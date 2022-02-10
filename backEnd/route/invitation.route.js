const express = require('express');
const router = express.Router();
const invitationController = require('../controller/invitation.controller');

router.post('/', invitationController.addInvitation);
router.get('/', invitationController.findInvitations);
router.get('/:id', invitationController.findInvitationById);
router.put('/:id', invitationController.updateInvitation);
router.delete('/:id', invitationController.deleteById);

router.get('/response/:is_active/:invitation_response/:id',invitationController.findInvitationsResponseByStatus);
router.get('/response/:is_active/:id',invitationController.findInvitationsResponse);
router.put('/:invitation_response/:id', invitationController.updateInvitation);
module.exports = router;
