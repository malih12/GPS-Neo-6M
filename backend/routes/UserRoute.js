import express from "express";
import {
    getUsers,
    getUsersById,
    createusers,
    updateusers,
    deletetusers
} from "../controllers/Users.js";

import { verifyUser,adminOnly } from "../middleware/AuthUser.js"

const router = express.Router();

router.get('/users',verifyUser,adminOnly,getUsers);
router.get('/users/:id',verifyUser,adminOnly,getUsersById);
router.post('/users',verifyUser,adminOnly,createusers);
router.patch('/users/:id',verifyUser,adminOnly,updateusers);
router.delete('/users/:id',verifyUser,adminOnly,deletetusers);

export default router;