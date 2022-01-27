const express = require('express');
const router = express.Router();
const jobTitleController = require('../controller/JobTitle.controller');

router.post('/', jobTitleController.addJobTitle);
router.get('/', jobTitleController.findJobTitles);
router.get('/:id', jobTitleController.findJobTitleById);
router.put('/:id', jobTitleController.updateJobTitle);
router.delete('/:id', jobTitleController.deleteById);

module.exports = router;
