require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
//const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const db = require('./config/database');

const msal = require('@azure/msal-node');
const { append } = require('express/lib/response');



db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('First Error: ' + err);
})


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.use(cors("*"));

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
    next(); 
});



app.use('/', require('./route/routes'));

const PORT = process.env.PORT || 4000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Second Error: " + err));



////////////////////////
// const config = {
//     auth: {
//         clientId: "ecddadaa-9556-4a46-9d55-9951b2e01469",
//         authority: "https://login.microsoftonline.com/13ec0e67-00c5-44c4-8bdb-52adb4a2feae/",
//         //authority : "common",
//         clientSecret: "~ev7Q~zWYUHcr6PggCG5OGmpveyP~aHAbA4TT",
//         redirectUri: "http://localhost:3000/users/login/"
//     },
//     system: {
//         loggerOptions: {
//             loggerCallback(loglevel, message, containsPii) {
//                 console.log(message);
//             },
//             piiLoggingEnabled: false,
//             logLevel: msal.LogLevel.Verbose,
//         }
//     }
// };

// // Create msal application object
// const cca = new msal.ConfidentialClientApplication(config);

// //console.log(cca)

// // router.use((req, res, next) => {
// //     console.log('Time:')
// //     next()
// //   })
// app.get('/users/microsoft-login', (req, res) => {
//     console.log('hi1')
//     const authCodeUrlParameters = {
//         scopes: ["user.read"],
//         redirectUri: "http://localhost:3000/users/login/",
//     };

//     // get url to sign user in and consent to scopes needed for application
//     cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
//         res.redirect(response);
//         console.log(response);
//         console.log('getauthcodeurl')
//     }).catch((error) => {
//         console.log('error1')
//         console.log(JSON.stringify(error))});
// });

// app.get('/users/login', (req, res) => {
//     console.log('hi2')
//     const tokenRequest = {
//         code: req.query.code,
//         scopes: ["user.read"],
//         redirectUri: "http://localhost:3000/users/login/",
//     };

//     cca.acquireTokenByCode(tokenRequest).then((response) => {
//         console.log('acquireTokenByCode')
//         console.log("\nResponse: \n:", response);
//         res.sendStatus(200);
        
//     }).catch((error) => {
//         console.log('error2')
//         console.log(error);
//         res.status(500).send(error);
//     });
// });

