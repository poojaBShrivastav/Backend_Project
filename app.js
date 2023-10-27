const express = require("express");
const dotenv = require("dotenv");
var morgan = require('morgan');
const path = require("path");
const ejs = require("ejs");
require("./server/database/connect");
const Model = require("./server/database/schema");
const axios = require("axios");


const app = express();
dotenv.config({path:"config.env"});
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname,"assets")));
app.use(morgan("tiny"));
app.use(express.urlencoded("extended: true"));
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

app.get("/create_user",(req,res)=>{

    res.render("add_user")
})

app.get("/all_user",(req,res)=>{
    axios.get("http://localhost:8080/api/user")
    .then((response)=>{
        // console.log(response.data)
        res.render("index",{users:response.data})
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send("can not get data from api")
    })
    
})

app.get("/update_user",(req,res)=>{
    console.log(req.query.id)
    axios.get("http://localhost:8080/api/user/",{params:{id:req.query.id}})
    .then((userdata)=>{
        console.log(userdata.data)
        res.render("update_user",{user:userdata.data})
    })
    .catch((err)=>{
        console.log(err)
    })
    // res.render("update_user")
})

//fetch All user as well as single user
app.get("/api/user",async(req,res)=>{
    
        if(req.query.id){
            let id = req.query.id
            let data = await Model.find({_id:id})
           if(data){
            res.send(data);
           }else{
            res.send("unable to fetch single user")
           }
        }
        else{
            let data = await Model.find()
           if(data){
            res.send(data);
           }else{
            res.send("unable to fetch All user")
           }

        }
    
})

app.post("/api/user",async(req,res)=>{
        // console.log(req.body)
        try{
            const newuser = await new Model({
                name : req.body.name,
                email : req.body.email,
                gender : req.body.gender,
                status : req.body.status,
            })

            newuser.save();
            res.status(200)
            res.redirect("/all_user")
        }catch(err){
            res.status(500).send("unable to fetch user ")

        }
})


//update data 
app.put("/api/user/:id",async(req,res)=>{
    console.log(req.params.id)      
    try{
        const _id = req.params.id;
        
        const newuser = await {
            name : req.body.name,
            email : req.body.email,
            gender : req.body.gender,
            status : req.body.status,
        };
       
       let user = await Model.findOneAndUpdate({_id:_id},newuser)
        
        res.status(200)
       


    }catch(err){
        console.log(err)
        res.status(500).send("unable to fetch data from user")
    }
})

// delete from database
app.get("/aplication/users/:id",async(req,res)=>{
    console.log(req.params.id)
    try{
        const _id = req.params.id;
        
        let user = await Model.findOneAndDelete({_id:_id})
        
        res.status(200)
        res.redirect("/all_user")


    }catch(err){
        console.log(err)
        res.status(500).send("unable to delete data")
    }
})

app.listen(port,()=>{
    console.log("server is listening");
})