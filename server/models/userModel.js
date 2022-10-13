const mongoose = require("mongoose")

const Data = new mongoose.Schema({
    name:{
        type:String,required:true
    },
    age:{
        type:Number,required:true
    },
    DOB:{
        type:String,required:true
    },
    email:{
        type:String,required:true
    }
},{collection:"data"});

const data = mongoose.model("data",Data);
module.exports = data;