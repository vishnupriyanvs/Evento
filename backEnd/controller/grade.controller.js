const gradeDao = require('../dao/grade.dao');


var gradeController = {
    addGrade: addGrade,
    findGrades: findGrades,
    findGradeById: findGradeById,
    updateGrade: updateGrade,
    deleteById: deleteById,
}

async function addGrade(req, res) {
    let grade = req.body;
    
    gradeDao.create(grade).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findGradeById(req, res) {
    gradeDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    gradeDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Grade deleted successfully",
                grade: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateGrade(req, res) {
    gradeDao.updateGrade(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Grade updated successfully",
                grade: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findGrades(req, res) {
    gradeDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = gradeController;