const express = require("express");
const mongoose = require("mongoose");
const Data = require("../models/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const {authenticate} = auth;
router.post('/',authenticate,async (req,res)=>{
    const limit = req.body.collectionLimit;
    const pageNumber = req.body.pageNumber;

    const pageData = await Data.find().limit(limit).skip((pageNumber-1)*limit).exec()
    if(pageData)
    {
        res.status(200).send(pageData);
    }
    else
    {
        res.status(404);
    }
})

router.post("/signup",async(req,res)=>{
    const user = new Data({
        email:req.body.email,
        password:req.body.password,
        name:req.body.name,
        age:req.body.age,
        DOB:req.body.DOB,
        amount:0,
    });

    await Data.findOne({email:user.email}).then((err,obj)=>{
        if(!obj){
            bcrypt.hash(req.body.password,10,async (err,hash)=>{
                if(err)
                {
                    res.json({status:"error"});
                }else {
                    user.password = hash;
                    await user.save().then(()=>{
                        res.json({status:"ok"});
                    }).catch(err=>{
                        res.json({error:err});
                    })
                }
            })
        }
        else {
            res.status(403).send('User already exists...');
        }

    })


})
router.post("/signin",async (req,res)=>{
    await Data.findOne({email:req.body.email}).then((err,obj)=>{
        if(!obj)
        {
            res.status(404).send("User doesn't exist");
        }else{
            bcrypt.compare(req.body.password,obj.password,(err,result)=>{
                if(!result) {
                    res.status(400).send("Incorrect password")
                }else{
                    const payload ={
                        email:obj.email,
                        name:obj.name,
                    }

                    jwt.sign(payload,97732444030,{expiresIn:3600},(err,token)=>{
                        if(err)
                        {
                            res.status(500).send(err);
                        }else{
                            res.json({
                                status:'ok',
                                token
                            });
                        }
                    })
                }
            })
        }
    })
})

module.exports = router;