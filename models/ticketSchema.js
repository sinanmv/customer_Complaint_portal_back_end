const mongoose = require('mongoose')

// define schema for product collection 
const ticketSchema = new mongoose.Schema({
    username:
    {
        type: String,
        required: true
    },
    firstname:
    {
        type: String,
        required: true
    },
    lastname:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    phonenumber1: {
        type: String,
        required: true
    },
    phonenumber2: {
        type: String
    },
    address:
    {
        type: String,
        required: true
    },
    pincode : 
    {
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    serialnumber:{
        type:String,
        required:true
    },
    purchasedate:{
        type:String,
        required:true
    },
    invoiceno:{
        type:String,
        required:true
    },
    productdescription:{
        type:String,
        required:true
    },
    complainttype:{
        type:String,
        required:true
    },
    damagephoto:{
        type:String
    },
    internal:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    message: [
        {
          username: {
            type: String,
          },
          message: {
            type: String,
          }
        }
      ]
    

})

// Create a Model to store data
const ticket = new mongoose.model("tickets", ticketSchema)

// export model
module.exports = ticket