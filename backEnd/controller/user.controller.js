const userDao = require('../dao/user.dao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var tokenList = {};


var userController = {
    addUser: addUser,
    findUsers: findUsers,
    findUserById: findUserById,
    updateUser: updateUser,
    deleteById: deleteById,
    loginUser : loginUser,
    reLogin : reLogin,

    findContactPersons : findContactPersons
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
            console.log(data);
            res.send(data);
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
            //console.log(userPassword);
            const result = bcrypt.compareSync(password, userPassword);
            if (!result) return res.status(401).send('Password not valid!');
            //console.log(data.roles[0].user_roles.roleId)
            const accessToken = jwt.sign({ id:data.id}, process.env.ACCESS_TOKEN_SECRET_KEY, {
                expiresIn: '20min'
            });
            expiresIn= '2h'
            const refreshToken = jwt.sign({id: data.id }, process.env.REFRESH_TOKEN_SECRET_KEY,{
                expiresIn: 3600
            });
            //userInfo = data;
            res.status(200).send({
                "user": data,
                "accessToken": accessToken,
                "refreshToken": refreshToken,
                "expires_in": expiresIn
            });

            const response = {
                "accessToken" : accessToken,
                "refreshToken" : refreshToken
              }
            tokenList[refreshToken] = response;
        })
        .catch((error) => {
            console.log(error);
            return res.status(404).send('User not found!');
        });
}

function reLogin(req,res){
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken)   ;
    console.log(tokenList);
    if( refreshToken && (refreshToken in tokenList)){

      //decode refreshToken to get user id
      jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }
        var userId = decoded.id;
        var accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET_KEY, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN
        });
        // var newRefreshToken = jwt.sign({id: userId }, process.env.REFRESH_TOKEN_SECRET_KEY,{
        //     expiresIn: 120000
        // });
        const response = {
          "accessToken": accessToken
        }
        // update the token in the list
        tokenList[refreshToken].accessToken = accessToken
        // tokenList[refreshToken].refreshToken = newRefreshToken
        res.status(200).json(response);  
    });
    }else{
      res.status(404).send('invalid request')
    }
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


function findUsers(req, res) {
    userDao.findAllUsers().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


//////////////////
function findContactPersons(req, res) {
    userDao.findContactPersons().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = userController;