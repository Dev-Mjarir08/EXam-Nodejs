import { Router } from "express";
import adminRouter from "./admin.route.js";
import userRouter from "./user.route.js";
import userAuth from "../middleware/userAuth.js";
import adminController from "../controller/admin.controller.js";


const router = Router();
router.get('/', userAuth, adminController.dashboard)
router.use('/admin', adminRouter)
router.use('/user', userRouter)

export default router;