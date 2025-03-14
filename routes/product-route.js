import { Router } from "express";
import { addProduct, detailedAnalyticsforproduct, getProductByCategory, getStockProduct, sortProduct } from "../controller/product.js";

const router = Router();

router.post('/add', addProduct);
router.get('/instock', getStockProduct);
router.get('/category', getProductByCategory);

router.get('/analytics', detailedAnalyticsforproduct);
router.get('/sortedProducts', sortProduct);



export default router;

