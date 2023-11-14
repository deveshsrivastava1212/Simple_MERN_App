const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = `mongodb+srv://${process.env.Mongo_Admin}:${process.env.Mongo_Password}@cluster0.s2fchmf.mongodb.net/${process.env.Mongo_Project}?retryWrites=true&w=majority`

const connection = mongoose.connect(db,{
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
}).then(()=>{
    console.log("Connection Successfull");
}).catch((err)=> console.log(err));

module.exports=connection;