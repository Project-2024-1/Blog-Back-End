import express from "express";
import { uploadMiddleware, getAllImageAndFolder, uploadImageToCloudinary } from "../controller/image.controller.js";

const router = express.Router();

router.post("/", getAllImageAndFolder);

router.post("/addImage", uploadMiddleware, uploadImageToCloudinary);

export default router;