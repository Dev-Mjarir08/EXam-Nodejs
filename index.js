import express, { Router } from "express";
import envConfig from "./config/dotenv.js";
import router from "./routes/index.js"
import db from "./config/db.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

const PORT = envConfig.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('uploads'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(router)

app.listen(PORT, (error) => {
    if(error) {
        console.error('Error starting the server:', error);
    } else {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    }
})
