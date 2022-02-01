require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
//const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const db = require('./config/database');

const msal = require('@azure/msal-node');

db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('First Error: ' + err);
})


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));



app.use('/', require('./route/routes'));

const PORT = process.env.PORT || 4000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Second Error: " + err));



// //MSAL 

// const config = {
//     auth: {
//         clientId: "d3db692a-4c4e-47f7-9b4d-94db5af7a97c",
//         authority: "https://login.microsoftonline.com/13ec0e67-00c5-44c4-8bdb-52adb4a2feae",
//         clientSecret: "73bd46d8-ddc1-404b-bdf0-4b694ca94e7b",
//         //redirectUri: "http://localhost:3000/users/login"
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

// app.get('/', (req, res) => {
//     const authCodeUrlParameters = {
//         scopes: ["user.read"],
//         redirectUri: "http://localhost:3000/redirect",
//     };

//     // get url to sign user in and consent to scopes needed for application
//     cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
//         res.redirect(response);
//     }).catch((error) => console.log(JSON.stringify(error)));
// });

// app.get('/redirect', (req, res) => {
//     const tokenRequest = {
//         code: req.query.code,
//         scopes: ["user.read"],
//         redirectUri: "http://localhost:3000/redirect",
//     };

//     cca.acquireTokenByCode(tokenRequest).then((response) => {
//         console.log("\nResponse: \n:", response);
//         res.sendStatus(200);
//     }).catch((error) => {
//         console.log(error);
//         res.status(500).send(error);
//     });
// });