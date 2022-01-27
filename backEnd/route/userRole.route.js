const express = require('express');
const router = express.Router();
const userRoleController = require('../controller/userRole.controller');

router.post('/', userRoleController.addUserRole);
router.get('/', userRoleController.findUserRoles);
router.get('/:id', userRoleController.findUserRoleById);
router.put('/:id', userRoleController.updateUserRole);
router.delete('/:id', userRoleController.deleteById);

module.exports = router;
