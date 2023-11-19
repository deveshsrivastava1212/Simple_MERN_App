const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');

router.get('/',(req,res)=>{
    res.send("Hello From the router")
})

router.post('/register', (req,res) => {
    const {name, email, phone, password, Cpassword} = req.body;
    if( !name || !email || !phone || !password || !Cpassword)
    {
        return res.status(422).json({error: "Please Filled all fields.."});
    }
    User.findOne({email: email})
        .then((userExist)=>{
            if(userExist){
                return res.status(422).json({message: "User Already Exist..."});
            }
        const user = new User({name: name, email: email, phone:phone, password: password, Cpassword:Cpassword})
        user.save().then(()=>{
            res.status(200).json({message: "User Registered Successfully :) "})
        }).catch((err) => res.status(500).json({error: "Failed To Register :("}))
    }).catch((err)=>{console.log(err)});

});

module.exports = router;