const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/user.middleware')
const msalController = require('../controller/msal.controller')

router.get('/',msalController.msalLogin);
router.get('/redirect',msalController.msalRedirect)



module.exports = router;