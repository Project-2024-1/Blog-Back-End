/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Quản lý bài viết
 */

import express from "express";
import { checkAuthorization } from "../common/checkAuthorization.js";
import { addPost, deletePost, getPost } from "../controller/post.controller.js";

const router = express.Router();
/**
 * @swagger
 * /api/post/:
 *   get:
 *     summary: Lấy danh sách bài viết theo ID, pageSize và pageIndex
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: ID của bài viết cần lấy
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


router.get("/", getPost);

/**
 * @swagger
 * /api/post/addPost:
 *   post:
 *     summary: Thêm bài viết mới
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PostTitle:
 *                 type: string
 *               PostDescription:
 *                 type: string
 *               PostLink:
 *                 type: string
 *               PostImage:
 *                 type: string
 *               PostMetaTitle:
 *                 type: string
 *               PostMetaDescription:
 *                 type: string
 *               PostStatus:
 *                 type: string
 *               PostAuthor:
 *                  type: string
 *               PostTag:
 *                  type: string
 *               PostContent:
 *                  type: string
 *               PostSortOrder:
 *                  type: string
 *               PostTotalView:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Bài viết đã được thêm thành công.
 *       '500':
 *         description: Lỗi server khi thêm bài viết.
 */
router.post("/addPost", checkAuthorization, addPost);

/**
 * @swagger
 * /api/posts/deletePost:
 *   delete:
 *     summary: Xóa bài viết
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         description: ID của bài viết cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Bài viết đã được xóa thành công.
 *       '404':
 *         description: Không tìm thấy bài viết cần xóa.
 */
router.delete("/deletePost", checkAuthorization, deletePost);

/**
 * @swagger
 * /api/posts/deleteManyPost:
 *   delete:
 *     summary: Xóa nhiều bài viết
 *     tags: [Posts]
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
 *                 description: Mảng chứa các ID của bài viết cần xóa
 *     responses:
 *       '200':
 *         description: Bài viết đã được xóa thành công.
 *       '500':
 *         description: Lỗi server khi xóa bài viết.
 */
router.delete("/deleteManyPost", checkAuthorization, deletePost);

export default router;
