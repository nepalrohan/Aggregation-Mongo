import { Router } from "express";
import { ChangePassword, loginUser, registerUser } from "../controller/usercontroller.js";
import { authMiddleware } from "../middlewares/auth-midlewares.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changePassword',authMiddleware, ChangePassword);







export default router;

