const Location = require('../model/location');
var locationDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateLocation: updateLocation
}

function findAll() {
    return Location.findAll();
}


function findById(id) {
    return Location.findByPk(id);
}

function deleteById(id) {
    return Location.destroy({ where: { id: id } });
}

function create(location) {
    var newLocation = new Location(location);
    return newLocation.save();
}

function updateLocation(location, id) {
    var updateLocation = {
        place: location.place
    };
    return Location.update(updateLocation, { where: { id: id } });
}
module.exports = locationDao;