
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-midlewares.js";
import { isAdmin } from "../middlewares/adminCheck-middleware.js";
import { fetchImagesController, uploadImage } from "../controller/imagecontroller.js";
import { upload } from "../middlewares/upload-middlewares.js";

const router = Router();



router.post('/upload', authMiddleware, isAdmin, upload.single('image'), uploadImage);
router.get('/imageaccess', authMiddleware, fetchImagesController);





export default router;

