const userdata = require('../models/userdataSchema')
const ticketdata = require('./ticketController')
exports.adduser = async (req,res)=>{
    // destructure
    const{username,email,phonenumber,password}=req.body
    try{

        const user = await userdata.findOne({username})
        if(user){
            res.status(402).json("Already username Taken")
        }
        else{
            const newuser = new userdata({username,email,phonenumber,password,role:"user"})

            await newuser.save()
            res.status(200).json("user added successfully")
        }
    }
    catch(error){
        return res.status(400).json(error)
    }

}


exports.login = async (req,res)=>{
    const {username,password} = req.body
    try{
        const user = await userdata.findOne({username})
        if(user){
            if(user.password === password){
               
                res.status(200).json(user._id)
            }
            else{
                res.status(401).json("Wrong Password")
            }
        }
        else
        {
            res.status(404).json("Invalid Userid")
        }
    }
    catch{

    }
}
exports.dashboard = async (req,res)=>{
    
    const {id} = req.params
    const _id = id
    const user = await userdata.findOne({_id})
    if(user)
    {
        res.status(200).json(user)

    } 
    else{
        res.status(404).json("Invalid Userid")
    }
}
exports.getallinternaldetails = async (req,res)=>{
    try{

        role = "internal"
        const userdetails = await userdata.find({role})
        if(userdetails){
            res.status(200).json(userdetails)
        }
        else{
            res.status(402).json("no Internal Founded")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}

exports.getalluserdata = async (req,res)=>{
    const {id} = req.params
    const _id = id
    try{
        const user = await userdata.findOne({_id})
        if(user.role == "admin"){
            const alluser = await userdata.find()
            res.status(200).json(alluser)
        }
        else{
            res.status(404).json("Invalid Userid")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
    
}

exports.getuserdetails = async (req,res)=>{
    const {id} = req.params
    const _id = id
    try{
        const user = await userdata.findOne({_id})
        res.status(200).json(user)
    }
    catch(error){
        res.status(404).json(error)
    }
}
exports.updateuserdetails = async (req,res)=>{
    const {_id,username,email,phonenumber,password,role} = req.body

    try{
        const usercheck = await userdata.findOne({username})
        {
            if(usercheck && usercheck._id != _id){
                res.status(403).json("username already taken")
            }
            else{
                    // const user = await userdata.findOne({_id})
                
                    const updateuser = await userdata.updateOne({_id},{$set:{username,email,phonenumber,password,role}})
                    const newuser = await userdata.findOne({_id})
                    res.status(200).json(newuser)
            }
        }

    }
    catch(error){
        // console.log("worked");
        res.status(404).json(error)
    }
}

exports.userdelete = async (req,res)=>{
    const {id} = req.params
    const _id = id
    try{
        const user = await userdata.deleteOne({_id})
        if(user.deletedCount != 0 )
        {
                res.status(200).json("User deleted Successfully")
            }
            else{
                
                res.status(403).json("user already deleted")
            }

    }
    catch(error){
        res.status(404).json(error)
    }
}