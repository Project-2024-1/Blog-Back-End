/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý thành viên
 */
import express from "express";
import { getUser, addUser, deleteUser, changePassword } from "../controller/user.controller.js";

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

/**
 * @swagger
 * /api/user/updateUser:
 *   post:
 *     summary: Tạo User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserCode:
 *                 type: string
 *               UserName:
 *                 type: string
 *               UserPassword:
 *                 type: string
 *               UserEmail:
 *                 type: string
 *               UserAvatar:
 *                 type: string
 *               UserDescription:
 *                 type: string
 *               UserRole:
 *                 type: array
 *               UserStatus:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Thêm user thành công
 *       '404':
 *         description: User không tồn tại
 *       '401': 
 *         description: Mật khẩu sai
 *       '500':
 *         description: lỗi server
 */
router.post("/updateUser", addUser)
/**
 * @swagger
 * /api/user/changePassword:
 *   put:
 *     summary: Thay đổi mật khẩu
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               UserPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Thay đổi mật khẩu thành công
 */
router.put("/changePassword", changePassword)
/**
 * @swagger
 * /api/user/deleteUser:
 *   delete:
 *     summary: Xóa user theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID của User cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Quyền đã được xóa thành công.
 *       '404':
 */ 
router.delete("/deleteUser", deleteUser)

export default router;