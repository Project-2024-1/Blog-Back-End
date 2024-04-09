/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý thành viên
 */



import express from "express";
import { getUser, addUser } from "../controller/user.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Lấy danh sách User theo ID, pageSize và pageIndex
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: UserCode
 *         required: false
 *         schema:
 *           type: string
 *         description: ID của User cần lấy
 *       - in: path
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Số lượng bài viết trên mỗi trang
 *       - in: path
 *         name: pageIndex
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Số trang cần lấy
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách bài viết.
 *       '404':
 *         description: Không tìm thấy bài viết nào.
 */

router.get("/", getUser);
router.post("/updateUser", addUser)

export default router;