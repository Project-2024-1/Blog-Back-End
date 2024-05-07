/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Quản lý Danh mục bài viết
 */

import express from "express";
import { checkAuthorization } from "../common/checkAuthorization.js";
import { addCategory, deleteCategory, deleteManyCategory, getCategory, updateCategory } from "../controller/category.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/category/:
 *   get:
 *     summary: Lấy danh sách danh mục
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách danh mục.
 *       '404':
 *         description: Không tìm thấy danh mục nào.
 */
router.get("/", getCategory);
/**
 * @swagger
 * /api/category/addCategory:
 *   post:
 *     summary: Thêm danh mục mới
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CategoryName:
 *                 type: string
 *                 description: Tên của danh mục mới
 *               CategoryDescription:
 *                 type: string
 *                 description: Mô tả của danh mục mới
 *               CategoryStatus:
 *                 type: string
 *                 description: Trạng thái của danh mục mới
 *     responses:
 *       '200':
 *         description: Danh mục đã được thêm thành công.
 *       '400':
 *         description: Dữ liệu không hợp lệ.
 *       '500':
 *         description: Lỗi server khi thêm danh mục.
 */
router.post("/addCategory", addCategory);
/**
 * @swagger
 * /api/category/deleteCategory:
 *   delete:
 *     summary: Xóa danh mục
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID của danh mục cần xóa
 *     responses:
 *       '200':
 *         description: Danh mục đã được xóa thành công.
 *       '404':
 *         description: Không tìm thấy danh mục cần xóa.
 *       '500':
 *         description: Lỗi server khi xóa danh mục.
 */
router.delete("/deleteCategory", checkAuthorization, deleteCategory);
/**
 * @swagger
 * /api/category/updateCategory:
 *   patch:
 *     summary: Cập nhật danh mục
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CategoryId:
 *                 type: string
 *                 description: ID của danh mục cần cập nhật
 *               CategoryName:
 *                 type: string
 *                 description: Tên mới của danh mục
 *               CategoryDescription:
 *                 type: string
 *                 description: Mô tả mới của danh mục
 *               CategoryStatus:
 *                 type: string
 *                 description: Trạng thái mới của danh mục
 *     responses:
 *       '200':
 *         description: Danh mục đã được cập nhật thành công.
 *       '400':
 *         description: Dữ liệu không hợp lệ.
 *       '404':
 *         description: Không tìm thấy danh mục cần cập nhật.
 *       '500':
 *         description: Lỗi server khi cập nhật danh mục.
 */
router.patch("/updateCategory", updateCategory);
/**
 * @swagger
 * /api/category/deleteManyCategory:
 *   delete:
 *     summary: Xóa nhiều danh mục
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Mảng ID của các danh mục cần xóa
 *     responses:
 *       '200':
 *         description: Danh mục đã được xóa thành công.
 *       '400':
 *         description: Dữ liệu không hợp lệ.
 *       '404':
 *         description: Không tìm thấy danh mục cần xóa.
 *       '500':
 *         description: Lỗi server khi xóa danh mục.
 */
router.delete("/deleteCategory", checkAuthorization, deleteCategory);
export default router;