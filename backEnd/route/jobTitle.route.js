const express = require('express');
const router = express.Router();
const jobTitleController = require('../controller/JobTitle.controller');
const authenticateToken = require('../middleware/user.middleware');

router.post('/', authenticateToken([]),jobTitleController.addJobTitle);
router.get('/',authenticateToken(['Admin']), jobTitleController.findJobTitles);
router.get('/:id',authenticateToken([]), jobTitleController.findJobTitleById);
router.put('/:id',authenticateToken([]), jobTitleController.updateJobTitle);
router.delete('/:id', authenticateToken([]),jobTitleController.deleteById);

module.exports = router;
