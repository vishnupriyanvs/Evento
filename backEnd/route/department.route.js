const express = require('express');
const router = express.Router();
const departmentController = require('../controller/department.controller');

router.post('/', departmentController.addDepartment);
router.get('/', departmentController.findDepartments);
router.get('/:id', departmentController.findDepartmentById);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteById);

module.exports = router;
