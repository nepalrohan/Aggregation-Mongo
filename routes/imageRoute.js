
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-midlewares.js";
import { isAdmin } from "../middlewares/adminCheck-middleware.js";
import { uploadImage } from "../controller/imagecontroller.js";
import { upload } from "../middlewares/upload-middlewares.js";

const router = Router();



router.post('/upload', authMiddleware, isAdmin, upload.single('image'), uploadImage);




export default router;

