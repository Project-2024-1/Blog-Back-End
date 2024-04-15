
/**
 * @swagger
 * tags:
 *   name: Roles
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
 * /api/role/addRole:
 *   post:
 *     summary: Thêm hoặc sửa quyền Quyền
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
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
/**
 * @swagger
 * /api/role/deleteRole:
 *   delete:
 *     summary: Xóa quyền theo ID
 *     tags: [Roles]
 *     parameters:
 *       - in: query
 *         name: roleId
 *         required: true
 *         description: ID của quyền cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Quyền đã được xóa thành công.
 *       '404':
 */ 
router.delete("/deleteRole", deleteRole);
/**
 * @swagger
 * /api/role/deleteManyRole:
 *   delete:
 *     summary: Xóa nhiều quyền
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Mảng chứa các ID của quyền cần xóa
 *     responses:
 *       '200':
 *         description: Quyền đã được xóa thành công.
 *       '500':
 *         description: Lỗi server khi xóa Quyền.
 */
router.delete("/deleteManyRole", deleteManyRole);

export default router;