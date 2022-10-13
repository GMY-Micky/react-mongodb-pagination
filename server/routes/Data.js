const express = require("express");
const mongoose = require("mongoose");
const Data = require("../models/userModel");
const router = express.Router();

router.post('/',async (req,res)=>{
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

module.exports = router;