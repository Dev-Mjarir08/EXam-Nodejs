import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const adminController = {
    //dashboard page
    dashboard(req, res) {
        res.render('pages/admin/dashboard')
    },
    //admin signup
    async signup(req, res) {

        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            req.body.role = 'admin'
            const admin = await User.create(req.body)
            return res.json(admin)
        } catch (error) {
            res.status(500).json({
                message: 'Error creating admin',
                error
            })
        }
    },
    //admin login page
    loginPage(req, res) {
        res.render('./pages/admin/login')
    },
    //admin login, employee login and manager login are all the same, only the role is different, so we can use the same function for all of them

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.redirect(req.get('Referrer') || '/admin/login');
            }
            else {
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    // Store user info in token
                    const payload = {
                        id: user._id,
                        name: user.name,
                        role: user.role
                    };

                    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

                    res.cookie('token', token);
                    
                    if (user.role === 'admin') {
                        console.log("Admin logged in:", user);
                        return res.redirect('/');
                    }
                  
                    else if (user.role === 'user') {
                        return res.redirect('/user/addBlog');
                    }
                    else {
                        return res.redirect('/admin/login');
                    }
                }
                else {
                    return res.redirect(req.get('Referrer') || '/admin/login');
                }
            }
        }
        catch (error) {
            console.error(error);
            return res.redirect(req.get('Referrer') || '/admin/login');
        }
    },
    logout(req, res) {
        res.clearCookie('token');
        return res.redirect('/admin/login');
    },
}
export default adminController;