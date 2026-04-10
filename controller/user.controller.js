import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import fs from "fs"
const userController = {

    signupPage(req, res) {
        res.render('pages/user/signup')
    },
    dashboardPage(req, res) {
        res.render('index')
    },
    async signup(req, res) {
        try {
            const { password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
            req.body.role = 'user';
            await User.create(req.body);
            return res.redirect('/admin/login');

        } catch (error) {
            console.error('Error during user signup:', error);
            return res.status(500).render('pages/user/signup', { error: 'An error occurred during signup.' });
        }
    },
    async addBlogPage(req, res) {
        try {
            const categories = Blog.schema.path('category').enumValues;
            return res.render('pages/user/addBlog', { categories });
        } catch (error) {
            console.log(error);
            res.status(500).send("Error loading page");
        }
    },
    async addBlog(req, res) {
        try {
            console.log("Request body:", req.body);
            const { title, content, excerpt, tags, category } = req.body;

            let image = "";

            if (req.file) {
                image = req.file.filename;
            }

            const blog = await Blog.create({
                title,
                content,
                excerpt,
                tags,
                image,
                category,
                author: req.userId
            });


            return res.redirect("/user/viewBlogs");

        } catch (error) {
            console.error('Error creating blog:', error);
            res.status(500).send('Error creating blog');
        }
        // Add your blog creation logic here
    },
    async viewBlogsPage(req, res) {
        try {

            const blogs = await Blog.find({});

            res.render("pages/user/viewBlogs", { blogs });

        } catch (error) {
            console.error('Error creating blog:', error);
            res.status(500).send('Error creating blog');
        }
    },
    async editBlogPage(req, res) {
        try {

            const blog = await Blog.findById(req.params.id);
            res.render("pages/user/editBlog", { blog, categories: Blog.schema.path('category').enumValues });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error loading page");
        }
    },
    async updateBlog(req, res) {
        try {

            // Image handling
            let image = req.body.image;

            if (req.file) {
                req.body.image = req.file.path;
            }

            // Update blog
            await Blog.findByIdAndUpdate(req.params.id, req.body);

            // delete old image (without existsSync)
            if (req.file && image) {
                try {
                    fs.unlinkSync(image);
                } catch (err) {
                    console.log("Old image not found, skipping delete");
                }
            }

            return res.redirect("/user/viewBlogs");

        } catch (error) {
            console.error("Error updating blog:", error);
            res.status(500).send("Error updating blog");
        }
    },
    async deleteBlog(req, res) {
        try {
            const id = req.params.id;
            const blog = await Blog.findById(id);
            await Blog.findByIdAndDelete(id);
            fs.unlinkSync("uploads/" + blog.image);
            return res.redirect(req.get('Referrer') || '/user/viewBlogs');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/user/viewBlogs');
        }

    },
    async myBlog(req, res) {
        try {
            const blogs = await Blog.find({ author: req.userId })
                .populate('author', 'name');

            res.render("pages/user/myBlogs", { blogs });

        } catch (error) {
            console.error("Error fetching user's blogs:", error);
            res.status(500).send("Error fetching user's blogs");
        }
    }
}

export default userController;