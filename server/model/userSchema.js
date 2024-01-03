const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
    work:{
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    Cpassword: {
        type: String,
        required: true,
        // validate:{
        //     validator: function(value){
        //         return value === this.password;
        //     },
        //     message: "Password do not match"
        // }
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

//Hasing Password Middleware
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.Cpassword = await bcrypt.hash(this.Cpassword, 12);
    }
    next();
});

//Generating Json Web Token
userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token})
        await this.save();
        return token;
    }catch(err)
    {

    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;