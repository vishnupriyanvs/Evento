const User = require('../model/user');
const UserRole = require('../model/userRole')

var userDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    findByUsername : findByUsername,
    deleteById: deleteById,
    updateUser: updateUser
}

function findAll() {
    return User.findAll();
}


function findById(id) {
    return User.findByPk(id);
}

function findByUsername(username) {
    return User.findOne({
        where : {username : username},
        include: [{
            model: UserRole
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
module.exports = userDao;