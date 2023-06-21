

// import express
const express = require('express')

// import multer
const multer = require('multer')

// upload engine
const Storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/upload/')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + '--' + file.originalname)
    }
});
const upload = multer({storage: Storage})
// create router
const router = new express.Router()

// import userdata controller
const userdatacontroller = require('../controllers/userdataController')
// import review controller
const reviewcontroller = require('../controllers/reviewController')
// import ticket controller
const ticketcontroller = require('../controllers/ticketController')
// user add
router.post('/adduser',userdatacontroller.adduser)
// login
router.post('/login',userdatacontroller.login)
// dashboard
router.get('/dashboard/:id',userdatacontroller.dashboard)
// review add
router.post('/review/add',reviewcontroller.addreview)
// review details
router.get('/review/get',reviewcontroller.getallreview) 
// ticket register
router.post('/ticket/register',upload.single('damagephoto'),ticketcontroller.registerticket)
// ticket details
router.get('/ticket/get/:id',ticketcontroller.getticket)
// ticket details view
router.get('/ticket/view/:id',ticketcontroller.viewticket)
// internal details
router.get('/internal/get',userdatacontroller.getallinternaldetails)
// assign to internal
router.post('/internal/assign/:id',ticketcontroller.assigntoticket)
// get all user details
router.get('/user/allget/:id',userdatacontroller.getalluserdata)
// get user details
router.get('/user/getdetails/:id',userdatacontroller.getuserdetails)
// update user details
router.post('/user/updatedetails',userdatacontroller.updateuserdetails)
// delete user 
router.delete('/user/delete/:id',userdatacontroller.userdelete)
// delete ticket after delete user
router.delete('/ticket/deleteuserticket/:id',ticketcontroller.deleteticketuser)
// close ticket
router.delete('/ticket/closeticket/:id',ticketcontroller.deleteticket)
// complaint solved
router.get('/ticket/solved/:id',ticketcontroller.requesttodelete)
// get image
router.get('/image/preview/:id',ticketcontroller.viewimage)
// send message to ticket
router.post('/ticket/message',ticketcontroller.addMessagetoTicket)

// export router
module.exports = router