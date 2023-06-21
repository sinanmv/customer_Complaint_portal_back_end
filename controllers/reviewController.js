const review = require('../models/reviewSchema')

exports.getallreview = async (req,res)=>{
    try{
        const reviews = await review.find()
        console.log(reviews);
        res.status(200).json(reviews)

    }
    catch(err){
        res.status(404).json(err)
    }
}
exports.addreview = async (req,res)=>{
    try{
        const{username,notes,role}= req.body
        const addreview = new review({username,notes,role})
        await addreview.save()
        const reviewdata = await review.find()
        res.status(200).json(reviewdata)
    }
    catch(error){
        res.status(500).json(error)
    }
}