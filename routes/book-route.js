import { Router } from "express";
import { addBook, getBookDetail } from "../controller/bookController.js";

const router = Router();

router.post('/add', addBook);
router.get('/bookdetail', getBookDetail);




export default router;

