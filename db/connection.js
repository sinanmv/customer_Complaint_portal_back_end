const mongoose = require('mongoose')

// import from .env
const db = process.env.DATABASE

//  connection 

mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Database Connected");
}).catch((error)=>{
    console.log(error);
})
