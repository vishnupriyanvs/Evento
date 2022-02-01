const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {findById} = require('../dao/user.dao')
//const userRoles = require('../constant/constants');


const verifyToken = (token, secretKey) => jwt.verify(token, secretKey);

authenticateToken = (roles) => async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    const decoded = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if(!decoded) return res.sendStatus(401)
    req.user = decoded;
    const userDetails = await findById(req.user.id);
    const userRole = userDetails.roles.map((item) => item.type);
    const roleAccess = roles.some((item) => userRole.includes(item));
    if(!roleAccess) return res.status(401).send({message : 'No Role Permission'});

    // console.log(userDetails.roles)
    // console.log(userRole);
    next();
    }

module.exports = authenticateToken;