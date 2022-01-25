const locationDao = require('../dao/location.dao');


var locationController = {
    addLocation: addLocation,
    findLocations: findLocations,
    findLocationById: findLocationById,
    updateLocation: updateLocation,
    deleteById: deleteById,
}

async function addLocation(req, res) {
    let location = req.body;
    
    locationDao.create(location).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findLocationById(req, res) {
    locationDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    locationDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Location deleted successfully",
                location: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateLocation(req, res) {
    locationDao.updateLocation(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Location updated successfully",
                location: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findLocations(req, res) {
    locationDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = locationController;