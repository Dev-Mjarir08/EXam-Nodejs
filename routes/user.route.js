import { Router } from "express";
import userController from "../controller/user.controller.js";
import userAuth from "../middleware/userAuth.js";
import upload from "../middleware/upload.js";

const userRouter = Router();

userRouter.get('/signup',userController.signupPage)
userRouter.post('/signup', userController.signup)
userRouter.get('/addBlog',userAuth,upload,userController.addBlogPage)
userRouter.post('/addBlog',upload,userController.addBlog)
userRouter.get('/viewBlogs',userAuth, userController.viewBlogsPage)
userRouter.get('/editBlog/:id',userAuth, upload,userController.editBlogPage)
userRouter.post('/editBlog/:id',userAuth, upload,userController.updateBlog)
userRouter.get('/deleteBlog/:id',userAuth, userController.deleteBlog)
userRouter.get('/myBlogs',userAuth, userController.myBlog)


export default userRouter;