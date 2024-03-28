import express from "express";
import {  uploadMiddleware, getAllImages, uploadImageToCloudinary} from "../controller/image.controller.js";

const router = express.Router();

router.get("/", getAllImages);

router.post("/addImage" , uploadMiddleware , uploadImageToCloudinary);

export default router;