const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
require('./db/conn');

const app = express();

//we link the router file
app.use(require('./router/auth'));

app.listen(3000,()=>{
    console.log(`Server running...\n URL- http://localhost:3000`);
})