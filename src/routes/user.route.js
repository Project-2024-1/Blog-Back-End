import express from "express";
import { getUser } from "../controller/user.controller.js";

const router = express.Router();

router.post("/", getUser);

export default router;