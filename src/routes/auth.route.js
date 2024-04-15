/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Đăng kí, đăng nhập
 */

import express from "express";
import { google, signin, signup, getToken, refreshToken } from "../controller/auth.controller.js";
import { checkAuthorization } from "../common/checkAuthorization.js";

const router = express.Router();

router.get('/getToken', getToken);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Đăng kí 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserEmail:
 *                 type: string
 *               UserPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Đăng kí thành công.
 *       '500':
 *         description: Lỗi server khi Đăng kí.
 */
router.post('/signup', signup);


/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Đăng nhập 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserEmail:
 *                 type: string
 *               UserPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Đăng nhập thành công.
 *       '500':
 *         description: Lỗi server khi đăng nhập.
 */
router.post('/signin', signin);

router.post('/google', google);

router.post('/refreshToken', refreshToken);

export default router;