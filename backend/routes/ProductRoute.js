import express from "express";
import {
    getProducts,
    getProducstById,
    createProducts,
    updategetProducts,
    deletetProducts
} from "../controllers/Products.js";

import { verifyUser } from "../middleware/AuthUser.js"

const router = express.Router();

router.get('/products',verifyUser, getProducts);
router.get('/products/:id',verifyUser, getProducstById);
router.post('/products',verifyUser, createProducts);
router.patch('/products/:id', verifyUser,updategetProducts);
router.delete('/products/:id', verifyUser,deletetProducts); 

export default router;