/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Quản lý thao tác hệ thống
 */


import express from "express";
import { checkAuthorization } from "../common/checkAuthorization.js";
import { getLog, addLog } from "../controller/log.controller.js";

const router = express.Router();



/**
 * @swagger
 * /api/log/:
 *   get:
 *     summary: Lấy danh sách log theo ID
 *     tags: [Logs]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: ID của log cần lấy
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách log.
 *       '404':
 *         description: Không tìm thấy log nào.
 */

router.get("/", checkAuthorization, getLog);
/**
 * @swagger
 * /api/log/addLog:
 *   post:
 *     summary: Thêm log mới
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LogName:
 *                 type: string
 *                 description: Tên của log mới
 *               LogDescription:
 *                 type: string
 *                 description: Mô tả của log mới
 *               LogType:
 *                 type: string
 *                 description: Loại của log mới
 *     responses:
 *       '200':
 *         description: Log đã được thêm thành công.
 *       '400':
 *         description: Dữ liệu không hợp lệ.
 *       '500':
 *         description: Lỗi server khi thêm log.
 */
router.post("/addLog", checkAuthorization, addLog);

// router.patch("/updateLog", updateLog);

export default router;