const userDao = require('../dao/user.dao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


var userController = {
    addUser: addUser,
    findUsers: findUsers,
    findUserById: findUserById,
    updateUser: updateUser,
    deleteById: deleteById,
    loginUser : loginUser
}

async function addUser(req, res) {
    let user = req.body;
    
    userDao.create(user).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUserById(req, res) {
    userDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    userDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "User deleted successfully",
                user: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateUser(req, res) {
    userDao.updateUser(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "User updated successfully",
                user: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function loginUser(req, res){
    const username = req.body.username;
    const password = req.body.password;
    
    userDao.findByUsername(username).
        then((data) => {
            userPassword = data.password;
            console.log(userPassword);
            const result = bcrypt.compareSync(password, userPassword);
            if (!result) return res.status(401).send('Password not valid!');
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ username: data.username, role_id: data.userRole.roleId }, process.env.SECRET_KEY, {
                expiresIn: expiresIn
            });
            userInfo = data;
            res.status(200).send({
                "user": data,
                "accessToken": accessToken,
                "expires_in": expiresIn
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(404).send('User not found!');
        });
}

function findUsers(req, res) {
    userDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = userController;