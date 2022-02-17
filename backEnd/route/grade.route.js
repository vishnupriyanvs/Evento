const express = require('express');
const router = express.Router();
const gradeController = require('../controller/grade.controller');
const authenticateToken = require('../middleware/user.middleware')

router.post('/',authenticateToken([]), gradeController.addGrade);
router.get('/', authenticateToken([]),gradeController.findGrades);
router.get('/:id',authenticateToken([]), gradeController.findGradeById);
router.put('/:id', authenticateToken([]),gradeController.updateGrade);
router.delete('/:id', authenticateToken([]),gradeController.deleteById);

module.exports = router;
