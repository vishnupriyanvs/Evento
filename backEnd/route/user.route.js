const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const authenticateToken = require('../middleware/user.middleware')
const msalHelper = require('../helper/msal-login/msal.helper')

//router.post('/',authenticateToken(['Admin']),userController.addUser);
//router.get('/microsoft-login',msalHelper.msalLogin);


router.get('/contactpersons',authenticateToken(['Admin']),userController.findContactPersons)

router.get('/',authenticateToken(['Admin']),userController.findUsers);
router.get('/:id',authenticateToken(['Admin','Employee']), userController.findUserById);
//router.get('/:id',authenticateToken(['Admin']), userController.findUserById);

//router.put('/:id',authenticateToken(['Admin']),userController.updateUser);
//router.delete('/:id',authenticateToken(['Admin']),userController.deleteById);

router.post('/login',userController.loginUser);
router.post('/relogin',userController.reLogin);





module.exports = router;