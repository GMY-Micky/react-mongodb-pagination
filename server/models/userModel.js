const mongoose = require("mongoose")

const Data = new mongoose.Schema({
    email:{
        type:String,required:true
    },
    password:{
        type:String,required:true
    },
    name:{
        type:String,required:true
    },
    age:{
        type:Number,required:true
    },
    DOB:{
        type:String,required:true
    },
    amount:{
        type:Number,required:true
    }
},{collection:"data"});

const data = mongoose.model("data",Data);
module.exports = data;