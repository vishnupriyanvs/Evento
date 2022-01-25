const Grade = require('../model/grade');
var gradeDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateGrade: updateGrade
}

function findAll() {
    return Grade.findAll();
}


function findById(id) {
    return Grade.findByPk(id);
}

function deleteById(id) {
    return Grade.destroy({ where: { id: id } });
}

function create(grade) {
    var newGrade = new Grade(grade);
    return newGrade.save();
}

function updateGrade(grade, id) {
    var updateGrade = {
        type: grade.type,
        description : grade.description
    };
    return Grade.update(updateGrade, { where: { id: id } });
}
module.exports = gradeDao;