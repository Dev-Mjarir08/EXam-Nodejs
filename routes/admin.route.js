import { Router } from "express";
import adminController from "../controller/admin.controller.js";
import userAuth from "../middleware/userAuth.js";

const adminRouter = Router();

adminRouter.post('/signup', adminController.signup);
adminRouter.get('/login', adminController.loginPage);
adminRouter.post('/login', adminController.login);
adminRouter.get('/logout', userAuth, adminController.logout);
export default adminRouter;