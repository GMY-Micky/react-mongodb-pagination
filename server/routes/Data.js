const express = require("express");
const mongoose = require("mongoose");
const Data = require("../models/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const {faker} = require('@faker-js/faker');

router.post('/data',auth,async (req,res)=>{
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
        DOB:req.body.DOB,
        amount:0,
    });

    await Data.findOne({email:user.email}).then((err,obj)=>{
        if(!err){
            bcrypt.hash(req.body.password,10,async (err,hash)=>{
                if(err)
                {
                    res.json({status:"error"});
                }else {
                    user.password = hash;
                    await user.save().then(()=>{
                        res.json({status:"ok"});
                    }).catch(err=>{
                        res.json({status:"error"});
                    })
                }
            })
        }
        else {
            res.json({status:"error"});
        }

    })
})
router.post("/signin", async (req, res) => {
    await Data.findOne({ email: req.body.email })
        .then((obj) => {
            if (!obj) {
                res.json({ status: "error" });
            } else {
                bcrypt.compare(req.body.password, obj.password, (err, result) => {
                    if (err) {
                        console.log(err.message);
                    } else if (result) {
                        const payload = {
                            email: obj.email,
                            name: obj.name,
                        };
                        jwt.sign(
                            payload,
                            "97732444030",
                            (err, token) => {
                                if (err) {
                                    console.log(err.message);
                                } else {
                                    res.json({
                                        status: "ok",
                                        firstName: obj.firstName,
                                        token,
                                    });
                                }
                            }
                        );
                    } else {
                        res.json({status:"error"});
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
});


module.exports = router;