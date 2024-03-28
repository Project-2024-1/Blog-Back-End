import express from "express";
import multer from 'multer';
import { uploadImageToBase64, getAllImages } from "../controller/image.controller.js";

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get("/", getAllImages);
// router.post("/", getAllImagesCloudinary);
// router.post("/addImageClouddinary", addImageClouddinary);
router.post("/addImage", upload.single('image'), uploadImageToBase64);
// router.delete("/deleteImage", deleteImage);

export default router;