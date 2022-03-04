const express = require('express');
const router = express.Router();

const app = express();
// const router = express;

const msal = require('@azure/msal-node');
const { append } = require('express/lib/response');
//import { LogLevel } from "@azure/msal-browser";

// const SERVER_PORT = process.env.PORT || 3001;



// Create Express App and Routes


// app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`))


// Before running the sample, you will need to replace the values in the config,
// including the clientSecret
var msalHelper = {
    msalLogin : msalLogin
}

function msalLogin(){

console.log('hahahahhahaha')
const config = {
    auth: {
        clientId: "ecddadaa-9556-4a46-9d55-9951b2e01469",
        authority: "https://login.microsoftonline.com/13ec0e67-00c5-44c4-8bdb-52adb4a2feae/",
        //authority : "common",
        clientSecret: "~ev7Q~zWYUHcr6PggCG5OGmpveyP~aHAbA4TT",
        redirectUri: "http://localhost:4000/users/login/"
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

//console.log(cca)

// router.use((req, res, next) => {
//     console.log('Time:')
//     next()
//   })
router.get('/', (req, res) => {
    console.log('hi1')
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:4000/users/login/",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
        console.log(response);
        console.log('getauthcodeurl')
    }).catch((error) => {
        console.log('error1')
        console.log(JSON.stringify(error))});
});

router.get('/login', (req, res) => {
    console.log('hi2')
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:4000/users/login/",
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log('acquireTokenByCode')
        console.log("\nResponse: \n:", response);
        res.sendStatus(200);
        
    }).catch((error) => {
        console.log('error2')
        console.log(error);
        res.status(500).send(error);
    });
});


}

module.exports = msalHelper