import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next)=>{

try {

const authHeader  = req.headers['authorization'];
const token = authHeader && authHeader.split(" ")[1];

if(!token){
    return res.json({

        success:false,
        message:'Access denied, no token available, please proceed to login'
    })
}


const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
if(!verifyToken){
    return res.json({

        success:false,
        message:'Access denied,  token invalid, please proceed to login'
    })  
}
console.log(verifyToken)
req.userInfo =verifyToken;
next();

} catch (error) {
    console.log(error)
}

}