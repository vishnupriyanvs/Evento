const express = require('express');
const router = express.Router();
const locationController = require('../controller/location.controller');
const authenticateToken = require('../middleware/user.middleware')

router.post('/',authenticateToken([]), locationController.addLocation);
router.get('/',authenticateToken([]),locationController.findLocations);
router.get('/:id',authenticateToken([]),locationController.findLocationById);
router.put('/:id',authenticateToken([]), locationController.updateLocation);
router.delete('/:id',authenticateToken([]), locationController.deleteById);

module.exports = router;
