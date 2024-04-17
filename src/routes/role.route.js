
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Quản lý quyền thành viên
 */


import express from "express";
import { checkAuthorization } from "../common/checkAuthorization.js";
import { addRole, deleteManyRole, deleteRole, getRole } from "../controller/role.controller.js";

const router = express.Router();



/**
 * @swagger
 * /api/role/:
 *   get:
 *     summary: Lấy danh sách quyền thành viên theo ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: ID của quyền cần lấy
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách bài viết.
 *       '404':
 *         description: Không tìm thấy bài viết nào.
 */

router.get("/", getRole);
/**
 * @swagger
 * /api/post/addRole:
 *   post:
 *     summary: Thêm bài Quyền
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               RoleName:
 *                 type: string
 *               RoleDescription:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Bài viết đã được thêm thành công.
 *       '500':
 *         description: Lỗi server khi thêm bài viết.
 */
router.post("/addRole", addRole);
router.delete("/deleteRole", deleteRole);
router.delete("/deleteManyRole", deleteManyRole);

export default router;