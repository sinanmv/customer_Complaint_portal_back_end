// import dotenv for datasbase connection
require('dotenv').config()

// import express
const express = require('express')

// import db
require('./db/connection')
// import cors 
const cors = require('cors')

// import router 
const router = require('./routes/router')

const app = express()

app.use(express.static('public'));

// create server from express
const server = express()
// set port number
const port = 5000

// use from router convert json
server.use(cors())
server.use(express.json())
server.use(router)

server.get('/',(req,res)=>{
    res.status(200).json("Customer Complaint Portal")
})

server.listen(port)
