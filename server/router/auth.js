const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router  = express.Router();
require('../db/conn');
const User = require('../model/userSchema');

router.get('/',(req,res)=>{
    res.send("Hello From the router")
})

//User Register (Using Promises)
// router.post('/register', (req,res) => {
//     const {name, email, phone, password, Cpassword} = req.body;
//     if( !name || !email || !phone || !password || !Cpassword)
//     {
//         return res.status(422).json({error: "Please Filled all fields.."});
//     }
//     User.findOne({email: email})
//         .then((userExist)=>{
//             if(userExist){
//                 return res.status(422).json({message: "User Already Exist..."});
//             }
//         const user = new User({name: name, email: email, phone:phone, password: password, Cpassword:Cpassword})
//         user.save().then(()=>{
//             res.status(200).json({message: "User Registered Successfully :) "})
//         }).catch((err) => res.status(500).json({error: "Failed To Register :("}))
//     }).catch((err)=>{console.log(err)});

// });



//User Register (Async Await)
router.post('/register', async(req,res) =>{
    console.log(req.body)
    const { name, email, phone, work, password, Cpassword} = req.body;

    if( !name || !email || !phone || !work || !password || !Cpassword){
        return res.status(422).json({error: "Please Filled All Fields..."});
    }
    try {
        const userExist = await User.findOne({email : email});
        if(userExist) {
            res.status(422).json({error: "User Already Exist..."});
        }
        if(password === Cpassword)
            {
                const user = new User({name, email, phone, work, password, Cpassword});
                await user.save();
                res.status(201).json({message: "User Registered Successfully... :)"})
            }
        else{
            res.status(422).json({message: "Passwords are not same"})
        }
    } catch (err) {
        console.log(err);
    }
})

// Login
router.post('/signin', async(req,res)=>{
    const { email, password } = req.body;
    if( !email || !password){
        return res.status(400).json({error: "Fill the fields"})
    }
    try {
        const userData = await User.findOne({email : email})
        if(userData){
            const isMatch = await bcrypt.compare(password, userData.password)

            let token = await userData.generateAuthToken();

            //store cookie
            res.cookie("jwtoken", token,{
                expires: new Date(Date.now() + 172800000),
                httpOnly: true
            })
            console.log(token);
            if(isMatch)
                return res.status(200).json({message: "User login successful...:)"})
            else
                return res.status(400).json({error: "Invalid Credentials..."})
        }     
        else
            return res.status(400).json({error: "User not Exist...( Register First )"})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;