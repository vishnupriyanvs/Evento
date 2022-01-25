const express = require('express');
const router = express.Router();
const gradeController = require('../controller/grade.controller');

router.post('/', gradeController.addGrade);
router.get('/', gradeController.findGrades);
router.get('/:id', gradeController.findGradeById);
router.put('/:id', gradeController.updateGrade);
router.delete('/:id', gradeController.deleteById);

module.exports = router;
