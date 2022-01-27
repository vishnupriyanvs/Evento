const express = require('express');
const router = express.Router();
const locationController = require('../controller/location.controller');

router.post('/', locationController.addLocation);
router.get('/', locationController.findLocations);
router.get('/:id', locationController.findLocationById);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteById);

module.exports = router;
