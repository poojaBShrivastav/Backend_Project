const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    gender : String,
    status : String,
})

const userModel = mongoose.model("todoList",userSchema)

module.exports = userModel ;