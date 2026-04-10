import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.redirect('/admin/login');
        }

        const decoded = jwt.verify(token, 'secret');

        req.user = decoded;
        req.userId = decoded._id;
        res.locals.user = decoded;
        console.log("TOKEN USER:", req.user);
        console.log("USER ID:", req.userId);
        next();

    } catch (error) {
        console.log(error);
        return res.redirect('/admin/login');
    }
};

export default userAuth;