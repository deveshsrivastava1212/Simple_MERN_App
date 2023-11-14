const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
require('./db/conn');

const app = express();

//we link the router file
app.use(require('./router/auth'));

app.get('/',(req,res)=>{
    res.send(`Hello World`);
})

app.get('/about',(req,res)=>{
    res.send(`Hello About World in this project`);
})

app.get('/contact',(req,res)=>{
    res.send(`Hello Contact World`);
})

app.get('/signin',(req,res)=>{
    res.send(`Hello Signin World`);
})

app.get('/signup',(req,res)=>{
    res.send(`Hello signup World`);
})

app.listen(3000,()=>{
    console.log(`Server running...\n URL- http://localhost:3000`);
})