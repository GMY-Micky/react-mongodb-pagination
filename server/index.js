
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dataRouter = require("./routes/Data");
const Data = require("./models/userModel");
const {faker} = require('@faker-js/faker');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

mongoose.connect(
    "mongodb://GMY-Micky:AAmm66%23%23@firstone-shard-00-00.ohxlh.mongodb.net:27017,firstone-shard-00-01.ohxlh.mongodb.net:27017,firstone-shard-00-02.ohxlh.mongodb.net:27017/?ssl=true&replicaSet=atlas-wj0u3c-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
        useNewURLParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => {
        console.log("Database Connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use("/data",dataRouter);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

/*async function addFakeData()
{
    const data = await Data.find({});
    if(data.length === 0)
    {
        for(let i=0;i<100;i++)
        {
            const ageNumber = Math.ceil((Math.random()+Math.random()*100)%50+18);
            await Data.create({
                name:faker.name.fullName(),
                age:ageNumber,
                DOB:(`${Math.ceil((Math.random()+Math.random()*100)%30)}/${Math.ceil((Math.random()+Math.random()*100)%12)}/${2022-ageNumber}`),
                email:faker.internet.email(),
            }).catch((err)=>{
                console.log(err.message);
            })
        }
        console.log("here i am");
    }else
    {
        console.log("Data found...");
    }
}*/
