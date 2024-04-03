import express from "express";
import { google, signin, signup, getToken } from "../controller/auth.controller.js";
import { checkAuthorization } from "../common/checkAuthorization.js";

const router = express.Router();

router.get('/getToken', getToken);

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/google', google);

export default router;