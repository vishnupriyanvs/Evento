const express = require('express');
const router = express.Router();
const groupMailController = require('../controller/groupMail.controller');

router.post('/', groupMailController.addGroupMail);
router.get('/', groupMailController.findGroupMails);
router.get('/:id', groupMailController.findGroupMailById);
router.put('/:id', groupMailController.updateGroupMail);
router.delete('/:id', groupMailController.deleteById);

module.exports = router;
