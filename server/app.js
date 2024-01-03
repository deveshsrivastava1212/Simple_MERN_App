const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config({path: './config.env'});
require('./db/conn');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({extended: false})

//we link the router file
app.use(require('./router/auth'));

app.listen(3000,()=>{
    console.log(`Server running...\n URL- http://localhost:3000`);
})