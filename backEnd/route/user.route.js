const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authenticateToken = require('../middleware/user.middleware')

router.post('/', userController.addUser);

router.get('/contactpersons',userController.findContactPersons)

router.get('/',userController.findUsers);
router.get('/:id',authenticateToken(['Admin']), userController.findUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteById);

router.post('/login',userController.loginUser);
router.post('/relogin',userController.reLogin);



module.exports = router;