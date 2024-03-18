import express from "express";
import { addPost, deletePost, getPost } from "../controller/post.controller.js";

const router = express.Router();

router.post("/", getPost);
router.post("/addPost", addPost);
router.delete("/deletePost", deletePost);
router.delete("/deleteManyPost", deletePost);


export default router;