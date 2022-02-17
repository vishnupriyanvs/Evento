const express = require('express');
const router = express.Router();
const roleController = require('../controller/role.controller');
const authenticateToken = require('../middleware/user.middleware')

router.post('/',authenticateToken([]), roleController.addRole);
router.get('/',authenticateToken([]),roleController.findRoles);
router.get('/:id',authenticateToken([]), roleController.findRoleById);
router.put('/:id', authenticateToken([]),roleController.updateRole);
router.delete('/:id',authenticateToken([]),roleController.deleteById);

module.exports = router;
