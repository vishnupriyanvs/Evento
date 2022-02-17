const express = require('express');
const router = express.Router();
const departmentController = require('../controller/department.controller');
const authenticateToken = require('../middleware/user.middleware')

router.post('/',authenticateToken([]), departmentController.addDepartment);
router.get('/',authenticateToken([]), departmentController.findDepartments);
router.get('/:id',authenticateToken([]), departmentController.findDepartmentById);
router.put('/:id', authenticateToken([]),departmentController.updateDepartment);
router.delete('/:id',authenticateToken([]), departmentController.deleteById);

module.exports = router;
