const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        type: Number,
        required: true,
        maxLength: 10
    },
    password: {
        type: String,
        required: true,
    },
    Cpassword: {
        type: String,
        required: true,
        validate:{
            validator: function(value){
                return value === this.password;
            },
            message: "Password do not match"
        }
    }
})

const User = mongoose.model('USER', userSchema);

module.exports = User;