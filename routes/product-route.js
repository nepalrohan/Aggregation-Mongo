import { Router } from "express";
import { addProduct, getProductByCategory, getStockProduct } from "../controller/product.js";

const router = Router();

router.post('/add', addProduct);
router.get('/instock', getStockProduct);
router.get('/category', getProductByCategory);


export default router;

