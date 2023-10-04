import express from "express";
import {
    getProducts,
    getProducstById,
    createProducts,
    updategetProducts,
    deletetProducts
} from "../controllers/Products.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProducstById);
router.post('/products', createProducts);
router.patch('/products/:id', updategetProducts);
router.delete('/products/:id', deletetProducts); 

export default router;