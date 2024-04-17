import express from "express";
import { uploadMiddleware, getAllImageAndFolder, uploadImageToCloudinary, deleteImageCloud } from "../controller/image.controller.js";

const router = express.Router();

router.post("/", getAllImageAndFolder);

router.post("/addImage", uploadMiddleware, uploadImageToCloudinary);

router.delete("/deleteImage", deleteImageCloud);

export default router;