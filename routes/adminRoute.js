import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-midlewares.js";
import { isAdmin } from "../middlewares/adminCheck-middleware.js";

const router = Router();

router.get('/dashboard', authMiddleware, isAdmin,  (req, res)=>{
    res.json({
        message:'Welcome to adminPage!!!1'
    })
})



export default router;

