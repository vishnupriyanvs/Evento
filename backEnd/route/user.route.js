const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authenticateToken = require('../middleware/user.middleware')

router.post('/', userController.addUser);
router.get('/', authenticateToken,userController.findUsers);
router.get('/:id', userController.findUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteById);

router.post('/login',userController.loginUser);

module.exports = router;
