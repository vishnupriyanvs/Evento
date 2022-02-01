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


