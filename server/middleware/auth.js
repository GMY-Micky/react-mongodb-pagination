const jwt = require("jsonwebtoken");

export default {
    authenticate(req,res,next){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            res.status(401).json({message:'Unauthenticated'});
        }else{
            jwt.verify(token,97732444030,(err,user)=>{
                if(err)
                {
                    return res.status(401).json({message:'Unauthenticated'})
                }
                next();
            })
        }

    }
}