const msal = require('@azure/msal-node');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const userDao = require('../dao/user.dao');
//const { append } = require('express/lib/response');
const url = require('url'); 


var msalController = {
    msalLogin : msalLogin,
    msalRedirect : msalRedirect
}

var tokenList = {};

const config = {
    auth: {
        clientId: "ecddadaa-9556-4a46-9d55-9951b2e01469",
        authority: "https://login.microsoftonline.com/13ec0e67-00c5-44c4-8bdb-52adb4a2feae/",
        //authority : "common",
        clientSecret: "~ev7Q~zWYUHcr6PggCG5OGmpveyP~aHAbA4TT",
        redirectUri: "http://localhost:4000/microsoft-login/redirect"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

// Create msal application object
const cca = new msal.ConfidentialClientApplication(config);

function msalLogin(req,res){
    //console.log('hi1')
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:4000/microsoft-login/redirect",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
        //console.log(response);
        //console.log('getauthcodeurl')
    }).catch((error) => {
        //console.log('error1')
        console.log(JSON.stringify(error))});
}



async function msalRedirect(req,res){
    //console.log('hi2')

    var token;
    //const verifyToken = async (token, secretKey, cb) => jwt.verify(token, secretKey, cb);
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:4000/microsoft-login/redirect",
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        token = response.accessToken;
        const decodedMsal = jwt.decode(token,async (err, data) => {
            if (err) return res.status(403).send({ message: "Token Expired" })
                return data})
        console.log(decodedMsal.unique_name);

        userDao.findByMail(decodedMsal.unique_name).
            then((data)=>{
                //console.log(data)
                const accessToken = jwt.sign({ id:data.id}, process.env.ACCESS_TOKEN_SECRET_KEY, {
                    expiresIn: '20min'
                });
                expiresIn= '3h'
                const refreshToken = jwt.sign({id: data.id }, process.env.REFRESH_TOKEN_SECRET_KEY,{
                    expiresIn: '3h'
                });

                const response = {
                    "accessToken" : accessToken,
                    "refreshToken" : refreshToken
                  }
                tokenList[refreshToken] = response;
                //console.log(tokenList)
                // res.status(200).send({
                //     "user": data,
                //     "accessToken": accessToken,
                //     "refreshToken": refreshToken,
                //     "expires_in": expiresIn
                // })
                //console.log(data.name)
                res.redirect(url.format({
                    pathname:"http://localhost:3000/",
                    query: {
                        "accessToken": accessToken,
                        "refreshToken": refreshToken,
                        "role": data.roles[0].id,
                        "id": data.id,
                        "name" : data.name,
                        "msal" : true
                     }
                  }));
                
            })
            .catch((error) => {
                console.log(error);
                return res.status(404).send('User not found');
            });
        // res.sendStatus(200);
        
        
    }).catch((error) => {
        //console.log('error2')
        console.log(error);
        res.status(500).send(error);
    });

    //console.log('token' + token)
    // const decodedMsal = verifyToken(token, "~ev7Q~zWYUHcr6PggCG5OGmpveyP~aHAbA4TT", (err, data) => {
    //     if (err) return res.status(403).send({ message: "Token Expired" })
    //         return data;
    // })
    // console.log(decodedMsal);
    
    // const decodedMsal = jwt.decode(token,async (err, data) => {
    //     if (err) return res.status(403).send({ message: "Token Expired" })
    //         return data})
    // console.log(decodedMsal);

   
}



module.exports = msalController