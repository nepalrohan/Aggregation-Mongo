import { Router } from "express";
import { addAuthor } from "../controller/authorController.js";

const router = Router();

router.post('/add', addAuthor);




export default router;

