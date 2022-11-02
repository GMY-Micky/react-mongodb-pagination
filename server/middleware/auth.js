const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if(!token){
            res.status(401).json({message:'Unauthenticated'});
        }else{
            jwt.verify(token,"97732444030",(err,user)=>{
               if(user)
               {
                   next();
               }else
               {
                   res.status(401).json({message:'Unauthenticated'});
               }
            })
        }
}