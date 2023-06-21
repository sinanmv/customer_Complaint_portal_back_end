const mongoose = require('mongoose')

// define schema for product collection 
const userdataSchema = new mongoose.Schema({
    username:
    {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{  
        type:String,
        required:true
    }
})

// Create a Model to store data
const userdata = new mongoose.model("userdatas",userdataSchema)

// export model
module.exports = userdata