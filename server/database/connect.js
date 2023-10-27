const mongoose = require("mongoose")
const connectionString = "mongodb://127.0.0.1:27017/CRUD"

mongoose.connect(connectionString)
.then(()=>{
    console.log("connected successfully")
})
.catch(()=>{
    console.log(err)
})