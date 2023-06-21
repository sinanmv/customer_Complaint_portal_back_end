const ticket = require('../models/ticketSchema')
const userdata = require('../models/userdataSchema')
const path = require('path');

exports.registerticket = async (req,res)=>{
    console.log(req);
    try{
        const{
            username,
            firstname,
            lastname,
            email,
            phonenumber1,
            phonenumber2,
            address,
            pincode,
            state,
            brand,
            serialnumber,
            purchasedate,
            invoiceno,
            productdescription,
            complainttype,
        }=req.body
        const { filename } = req.file
        console.log(filename);
        const oldticket = await ticket.findOne({serialnumber})
        if(oldticket){
            res.status(403).json("already registered")
        }
        else
        {
            
            const newregister = new ticket({
                username,
                firstname,
                lastname,
                email,
                phonenumber1,
                phonenumber2,
                address,
                pincode,
                state,
                brand,
                serialnumber,
                purchasedate,
                invoiceno,
                productdescription,
                complainttype,
                damagephoto:filename,
                internal:" ",
                status:"pending",
                message:[]
            })

            await newregister.save()
    
            res.status(200).json("Register successfully")
    
        }
    }
    catch(error){
        console.log(error)
    }
   
}
exports.getticket = async (req,res)=>{
    const {id} = req.params
    _id = id
    try{
        const role = await userdata.findOne({_id})
        if(role.role=="admin"){
            const tickets = await ticket.find({})
            res.status(200).json(tickets)
        }
        else if(role.role == "internal"){
            internal = role.username
            const tickets = await ticket.find({internal})
            res.status(200).json(tickets)
        }
        else if(role.role == "user"){
            username = role.username
            const tickets = await ticket.find({username})
            res.status(200).json(tickets)
        }
        else{
            res.status(401).json("Unauthorized")
        }
    }
    catch(error){
        console.log(error)
    }
}
// after delete user 
exports.deleteticketuser = async (req,res)=>{
    const {id} = req.params
    const _id = id
    try{
        const role = await userdata.findOne({_id})
        if(role){
            username = role.username
            const data = await ticket.deleteMany({username})
            res.status(200).json(data)
        }
        

    }catch(error){
        console.log(error)
    }
}
exports.deleteticket = async (req,res)=>{
    const {id} = req.params
    const _id = id
    try{
        const ticketcount =  await ticket.deleteOne({_id})
        if(ticketcount.deletedCount != 0){
            res.status(200).json("Ticket Closed")
        }
        else{
            res.status(200).json("Ticket not found")
        }
    }
    catch(error){
        console.log(error)
    }
}

exports.viewimage = async (req,res)=>{
    const {id} = req.params
    const imagePath = path.join(__dirname, `../public/upload/${id}`);
    res.sendFile(imagePath)
}
exports.viewticket = async (req,res)=>{
    const{id} = req.params
    _id = id
    try{
        const ticketdata = await ticket.findOne({_id})
        if(ticketdata){
            res.status(200).json(ticketdata)
        }
        else{
            res.status(402).json("INvalid Id")
        }


    }
    catch(error){
        console.log(error)
    }
}
exports.assigntoticket = async (req,res)=>{
    const {username} = req.body
    const {id} = req.params
    _id = id
    try{
        const ticketdata = await ticket.findOne({_id})
        if(ticketdata){
            ticketdata.internal = username
            ticketdata.status = "Assigned to Internal"
            await ticketdata.save()
            const ticketview = await ticket.findOne({_id})
            res.status(200).json(ticketview)
        }
        else{
            res.status(402).json("Invalid Id")
        }
    }
    catch(error){
        res.status(200).json(error)
    }
}
exports.requesttodelete = async (req,res)=>{
    const {id} = req.params
    _id = id
    try{
        const ticketdata = await ticket.findOne({_id})
        if(ticketdata){
            ticketdata.status = "Complaint Solved"
            await ticketdata.save()
            res.status(200).json("Submitted")
        }
        else{
            res.status(402).json("Invalid Id")
        }

    }
    catch(error){
        res.status(200).json(error)
    }
}

exports.addMessagetoTicket = async (req,res)=>{
    const {id,username,message} = req.body
    _id = id
    console.log("worked");
    try{
        console.log("worked");
        const ticketdata = await ticket.findOneAndUpdate(
            { _id },
            {
              $push: {
                message: {
                  username: username,
                  message: message
                }
              }
            },
            { new: true } // This option returns the updated document
          );
        console.log("worked");
        if(ticketdata){
            
            console.log("worked");
            console.log(ticketdata);
            await ticketdata.save()
            // const ticketview = await ticket.findOne({_id})
            res.status(200).json(ticketdata)
        }
        else
        {
            res.status(402).json("Invalid Ticket Number")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}
