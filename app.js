const express = require("express")
const mongoose = require("mongoose")
const bodypaser = require("body-parser");
const app = express();

const port  = 3000;


app.use(bodypaser.urlencoded({ extended: false }) )
//name=prince&school=hic&class=bodypaser.json

app.use(bodypaser.json() )
 

app.get('/', (req,res, next)=>{

    res.send("hello")
});


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

})


const UserModel  = mongoose.model("users", userSchema )

app.post('/register', (req,res, next)=>{

     console.log({data: req.body})
let name   = req.body.name;
let email   = req.body.email;
let password   = req.body.password;

     UserModel.create({
name, email, password
     })
     .then((done)=>{
        res.status(200).json({
            message:"Registration was successful"
         })
     })
.catch((err)=>{
let msg = err;
if(err.hasOwnProperty("code") && err.code == "11000" ){
     msg = "email has been used by another user, please change your email address"
}

    res.status(500).json({
        message:"Registration was not successful",
        err: msg
     })
})
     


});


app.post('/login', (req,res, next)=>{

    let email = req.body.email;
let password = req.body.password;


  UserModel.findOne({ email})
  .then( (done)=>{

if(done==null){

    res.status(404).json({
        message: "user not found"
    })

}
else{

let  user = done;
if(done.password == password){
 done.password = "";
    res.status(200).json(done)
}
else{
    res.status(401).json({
        message: "you entered a wrong password "
    })
}

}


  })
  .catch((err)=>{
    res.status(500).json({
        message: "unknown error occurred."
    })
  })
  
  
  
  ;
});

app.patch('/update', (req,res, next)=>{
let email = req.body.email;


let newData = {

}

if(req.body.hasOwnProperty("name")){
    newData.name = req.body.name
}


if(req.body.hasOwnProperty("password")){
    newData.password = req.body.password
}



    UserModel.updateOne({email}, newData)
    .then((done)=>{
let message = "update was successful."
        if(done.hasOwnProperty("modifiedCount") && done.modifiedCount ==0){
message = "update was successful, but not modification was made.  please enter a different data from the existing ones."
        }
res.status(200).json({
    message ,
    done
})


    })
    .catch((err)=>{
        res.status(500).json({
            message: "unknown error occurred."
        })
    })

});
app.delete('/delete', (req,res, next)=>{

    let {email, name, password} = req.body;
    
    UserModel.deleteOne({email})
    .then((done)=>{
        res.status(200).json({
            message: "deletion was successful",
            done
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message: "deletion failed"
        })
    })
});

/*  */

mongoose.connect("mongodb://localhost:27017/hic")
.then((done)=>{
console.log("DB connection was successful. ")

app.listen(port, ()=>{
    console.log("server is ready on port ", port)
});


})
.catch((err)=>{

console.log(`an error occurred , hence server was unable to start. ${err}`)
})

// Javascript Promise