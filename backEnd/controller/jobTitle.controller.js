const jobTitleDao = require('../dao/jobTitle.dao');


var jobTitleController = {
    addJobTitle: addJobTitle,
    findJobTitles: findJobTitles,
    findJobTitleById: findJobTitleById,
    updateJobTitle: updateJobTitle,
    deleteById: deleteById,
}

async function addJobTitle(req, res) {
    let jobTitle = req.body;
    
    jobTitleDao.create(jobTitle).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findJobTitleById(req, res) {
    jobTitleDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    jobTitleDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "JobTitle deleted successfully",
                jobTitle: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateJobTitle(req, res) {
    jobTitleDao.updateJobTitle(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "JobTitle updated successfully",
                jobTitle: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findJobTitles(req, res) {
    jobTitleDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = jobTitleController;