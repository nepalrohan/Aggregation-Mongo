import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-midlewares.js";

const router = Router();

router.get('/', authMiddleware, (req, res)=>{

    const {username, userId, role} = req.userInfo;
    res.json({
        message:'Welcome to homepage!!!1',
        userDetails:{
            username:username,
            userId:userId,
            role:role
        }
    })
})



export default router;

