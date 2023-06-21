const mongoose = require('mongoose')

// define schema for product collection 
const reviewSchema = new mongoose.Schema({
    username:
    {
        type:String,
        required:true
    },
    notes:
    {
        type:String,
        required:true
    },
    role:{  
        type:String,
        required:true
    }
})

// Create a Model to store data
const review = new mongoose.model("reviews",reviewSchema)

// export model
module.exports = review