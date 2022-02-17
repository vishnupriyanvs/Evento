const User = require('../model/user');
// const UserRole = require('../model/userRole')
const Role = require('../model/role')

var userDao = {
    findAllUsers: findAllUsers,
    create: create,
    findById: findById,
    findByUsername : findByUsername,
    deleteById: deleteById,
    updateUser: updateUser,

    findContactPersons : findContactPersons
}

function findAllUsers() {
    return User.findAll();
}


function findById(id) {
    return User.findOne({
        where : {id : id}, 
        include : [{
            model : Role
        }]
    });
}

function findByUsername(username) {
    return User.findOne({
        where : {username : username},
        include: [{
            model: Role
           }]
    });
}

function deleteById(id) {
    return User.destroy({ where: { id: id } });
}

function create(user) {
    var newUser = new User(user);
    return newUser.save();
}

function updateUser(user, id) {
    var updateUser = {
        username: user.username,
        password : user.password,
        gender : user.gender,
        email : user.email,
        contact : user.contact,
        image_url : user.image_url,
        jobTitleId : user.jobTitleId,
        gradeId : user.gradeId,
        locationId : user.locationId,
        departmentId : user.departmentId
    };
    return User.update(updateUser, { where: { id: id } });
}


///////////////////////

function findContactPersons() {
    return User.findAll({
        attributes : ["id","name"]
    });
}



module.exports = userDao;