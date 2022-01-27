const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRoles = require('../constant/constants');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log(user);
        if (req.user.role_id === userRoles.admin)
            next();
        else { console.log("Not Admin"); return res.sendStatus(403); }
    })
}

module.exports = authenticateToken;