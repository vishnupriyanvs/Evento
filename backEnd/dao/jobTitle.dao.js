const JobTitle = require('../model/jobTitle');
var jobTitleDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateJobTitle: updateJobTitle
}

function findAll() {
    return JobTitle.findAll();
}


function findById(id) {
    return JobTitle.findByPk(id);
}

function deleteById(id) {
    return JobTitle.destroy({ where: { id: id } });
}

function create(jobTitle) {
    var newJobTitle = new JobTitle(jobTitle);
    return newJobTitle.save();
}

function updateJobTitle(jobTitle, id) {
    var updateJobTitle = {
        title: jobTitle.title
    };
    return JobTitle.update(updateJobTitle, { where: { id: id } });
}
module.exports = jobTitleDao;