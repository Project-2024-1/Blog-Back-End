import express from "express";
import { checkAuthorization } from "../common/checkAuthorization.js";
import { addPost, deletePost, getPost } from "../controller/post.controller.js";

const router = express.Router();

router.get("/",checkAuthorization, getPost);
router.post("/addPost", addPost);
router.delete("/deletePost", deletePost);
router.delete("/deleteManyPost", deletePost);


export default router;