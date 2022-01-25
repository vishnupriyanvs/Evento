require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const db = require('./config/database');

db.authenticate().then(() => {

    console.log('Database connected...');

}).catch(err => {

    console.log('First Error: ' + err);

})


app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors("*"));





app.listen(3000)