/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Quản lý bài viết
 */

import express from "express";
import { checkAuthorization } from "../common/checkAuthorization.js";
import { addPost, deletePost, getPost, updatePost, getPostByCategory } from "../controller/post.controller.js";

const router = express.Router();
/**
 * @swagger
 * /api/post/:
 *   get:
 *     summary: Lấy danh sách bài viết theo ID, pageSize và pageIndex
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: ID của bài viết cần lấy
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Số lượng bài viết trên mỗi trang
 *       - in: query
 *         name: pageIndex
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Số trang cần lấy
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách bài viết.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID của bài viết
 *                   PostTitle:
 *                     type: string
 *                     description: Tiêu đề của bài viết
 *                   PostDescription:
 *                     type: string
 *                     description: Mô tả của bài viết
 *                   PostLink:
 *                     type: string
 *                     description: Url của bài viết
 *                   PostImage:
 *                     type: string
 *                     description: Ảnh bài viết
 *                   PostMetaTitle:
 *                     type: string
 *                     description: Tiêu đề SEO bài viết
 *                   PostMetaDescription:
 *                     type: string
 *                     description: Mô tả SEO bài viết
 *                   PostMetaKeyword:
 *                     type: string
 *                     description: Tu khoảng SEO bài viết
 *                   PostAuthor:    
 *                     type: string
 *                     description: Tên người bài viết
 *                   PostTag:
 *                     type: string
 *                     description: Nội dung bài viết
 *                   PostContent:
 *                     type: string
 *                     description: Nội dung bài viết
 *                   PostStatus:
 *                     type: string
 *                     description: Trạng thái bài viết
 *                   PostSortOrder:
 *                     type: string
 *                     description: Số thứ tự bài viết
 *                   PostTotalView:
 *                     type: string
 *                     description: Lượt xem bài viết
 *                   PostCategory:
 *                     type: array
 *                     description: Danh mục bài viết
 *       '500': 
 *         description: Lỗi server khi lọc bài viết.
 *       '404':
 *         description: Không tìm thấy bài viết nào.
 */

router.get("/", getPost);

/**
 * @swagger
 * /api/post/postCategory:
 *   get:
 *     summary: Lấy danh sách bài viết theo ID danh mục, pageSize và pageIndex
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: ID của Danh mục cần lấy
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Số lượng bài viết trên mỗi trang
 *       - in: query
 *         name: pageIndex
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Số trang cần lấy
 *     responses:
 *       '200':
 *         description: Thành công. Trả về danh sách bài viết.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID của bài viết
 *                   PostTitle:
 *                     type: string
 *                     description: Tiêu đề của bài viết
 *                   PostDescription:
 *                     type: string
 *                     description: Mô tả của bài viết
 *                   PostLink:
 *                     type: string
 *                     description: Url của bài viết
 *                   PostImage:
 *                     type: string
 *                     description: Ảnh bài viết
 *                   PostMetaTitle:
 *                     type: string
 *                     description: Tiêu đề SEO bài viết
 *                   PostMetaDescription:
 *                     type: string
 *                     description: Mô tả SEO bài viết
 *                   PostMetaKeyword:
 *                     type: string
 *                     description: Tu khoảng SEO bài viết
 *                   PostAuthor:    
 *                     type: string
 *                     description: Tên người bài viết
 *                   PostTag:
 *                     type: string
 *                     description: Nội dung bài viết
 *                   PostContent:
 *                     type: string
 *                     description: Nội dung bài viết
 *                   PostStatus:
 *                     type: string
 *                     description: Trạng thái bài viết
 *                   PostSortOrder:
 *                     type: string
 *                     description: Số thứ tự bài viết
 *                   PostTotalView:
 *                     type: string
 *                     description: Lượt xem bài viết
 *                   PostCategory:
 *                     type: array
 *                     description: Danh mục bài viết
 *       '500': 
 *         description: Lỗi server khi lọc bài viết.
 *       '404':
 *         description: Không tìm thấy bài viết nào.
 */
router.get("/postCategory", getPostByCategory);

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
 *               PostCategory:
 *                  type: array
 *                  items:
 *                     type: string
 *     responses:
 *       '200':
 *         description: Bài viết đã được thêm thành công.
 *       '500':
 *         description: Lỗi server khi thêm bài viết.
 */
router.post("/addPost", addPost);

/**
 * @swagger
 * /api/post/updatePost:
 *   patch:
 *     summary: Cập nhật bài viết
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PostId:
 *                 type: string
 *                 description: ID của bài viết cần cập nhật
 *               PostTitle:
 *                 type: string
 *                 description: Tiêu đề mới của bài viết
 *               PostDescription:
 *                 type: string
 *                 description: Mô tả mới của bài viết
 *               PostLink:
 *                 type: string
 *                 description: Đường dẫn mới của bài viết
 *               PostImage:
 *                 type: string
 *                 description: Ảnh mới của bài viết
 *               PostMetaTitle:
 *                 type: string
 *                 description: Tiêu đề Meta mới của bài viết
 *               PostMetaDescription:
 *                 type: string
 *                 description: Mô tả Meta mới của bài viết
 *               PostStatus:
 *                 type: string
 *                 description: Trạng thái mới của bài viết
 *               PostAuthor:
 *                  type: string
 *                  description: Tác giả mới của bài viết
 *               PostTag:
 *                  type: string
 *                  description: Tag mới của bài viết
 *               PostContent:
 *                  type: string
 *                  description: Nội dung mới của bài viết
 *               PostSortOrder:
 *                  type: string
 *                  description: Thứ tự sắp xếp mới của bài viết
 *               PostTotalView:
 *                  type: string
 *                  description: Số lượt xem mới của bài viết
 *               PostCategory:
 *                  type: array
 *                  items:
 *                     type: string
 *                  description: danh mục baì viết
 *     responses:
 *       '200':
 *         description: Bài viết đã được cập nhật thành công.
 *       '400':
 *         description: Dữ liệu không hợp lệ.
 *       '404':
 *         description: Không tìm thấy bài viết cần cập nhật.
 *       '500':
 *         description: Lỗi server khi cập nhật bài viết.
 */
router.patch("/updatePost", updatePost);


router.patch("/updatePost", updatePost);


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