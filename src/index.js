import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import imageRouter from './routes/image.route.js';

dotenv.config();


mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.log(err);
    });



const app = express();
const port = 3000;


app.use(cors({
    origin: '*', // Replace with your actual client origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

app.use(express.json());

app.listen(port, () => {
    console.log("Sever is running on port " + port + "!!!");
});

app.use(cors({
    origin: '*', // Replace with your actual client origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.use("/api/post", postRouter);

app.use("/api/image", imageRouter);

//middle were xử lý nhiều công việc trước khi chuyển đến route chính 
// next : có thể gọi để chuyển quyền sang middleware tiếp theo 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Sever Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});