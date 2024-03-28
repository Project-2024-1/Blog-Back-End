import { getDataBase, getUrlBase } from "../common/getDataBase.js";
import Post from "../models/post.model.js";
import { uploadImageToBase64 } from "./image.controller.js";

export const getPost = async(req, res) => {
    try {
        const idPost = req.body._id;
        const pageSize = req.body.pageSize;
        const pageIndex = req.body.pageIndex;
        let posts = [];
        let total = "";
        if (idPost) {
            posts = await Post.findOne({ _id: idPost });
            total = "1";
        } else if (pageSize && pageIndex) {
            posts = await Post.find().skip((pageIndex - 1) * pageSize).limit(pageSize);
            total = await Post.count();
        } else {
            posts = await Post.find();
            total = await Post.count();
        }
        res.json({ posts, total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addPost = async(req, res, next) => {

    // console.log(req.body);
    // const PostImage = await uploadImageToBase64(PostImage);
    const {
        PostTitle,
        PostDescription,
        PostLink,
        PostMetaTitle,
        PostImage,
        PostMetaDescription,
        PostMetaKeyword,
        PostAuthor,
        PostTag,
        PostContent,
        PostStatus,
        PostSortOrder,
        id
    } = req.body;

    let newPostTitle = getDataBase(PostTitle, PostTitle);
    let newPostDescription = getDataBase(PostDescription, PostDescription);
    let newPostContent = getDataBase(PostContent, PostContent);
    let newPostStatus = getDataBase(PostStatus, PostStatus);
    let newPostSortOrder = getDataBase(PostSortOrder, PostSortOrder);
    let newPostMetaTitle = getDataBase(PostMetaTitle, PostTitle);
    let newPostMetaDescription = getDataBase(PostMetaDescription, PostDescription);
    let newPostMetaKeyword = getDataBase(PostMetaKeyword, PostTitle);
    let newPostLink = getUrlBase(PostTitle);

    let postToUpdate = null;
    if (id) {
        // Nếu có id được truyền lên, đó là yêu cầu sửa đổi dữ liệu
        postToUpdate = await Post.findById(id);
        if (!postToUpdate) {
            return res.status(404).json({ error: "Bài viết không tồn tại." });
        }
        // Cập nhật các trường dữ liệu mới
        postToUpdate.PostTitle = newPostTitle;
        postToUpdate.PostDescription = newPostDescription;
        postToUpdate.PostLink = newPostLink;
        postToUpdate.PostImage = imageUrl;
        postToUpdate.PostMetaTitle = newPostMetaTitle;
        postToUpdate.PostMetaDescription = newPostMetaDescription;
        postToUpdate.PostMetaKeyword = newPostMetaKeyword;
        postToUpdate.PostAuthor = PostAuthor;
        postToUpdate.PostTag = PostTag;
        postToUpdate.PostContent = newPostContent;
        postToUpdate.PostStatus = newPostStatus;
        postToUpdate.PostSortOrder = newPostSortOrder;
    } else {
        // Nếu không có id được truyền lên, đây là yêu cầu thêm mới
        postToUpdate = new Post({
            PostTitle: newPostTitle,
            PostDescription: newPostDescription,
            PostLink: newPostLink,
            PostImage,
            PostMetaTitle: newPostMetaTitle,
            PostMetaDescription: newPostMetaDescription,
            PostMetaKeyword: newPostMetaKeyword,
            PostAuthor,
            PostTag,
            PostContent: newPostContent,
            PostStatus: newPostStatus,
            PostSortOrder: newPostSortOrder
        });
    }
    try {
        await postToUpdate.save();
        res.status(201).json({ message: "Bài viết đã được lưu thành công." });
    } catch (error) {
        next(error);
    }
}

export const deletePost = async(req, res) => {
    const idPost = req.body._id;

    try {
        await Post.findByIdAndDelete(idPost);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
}

export const deleteMultiplePosts = async(req, res, next) => {
    const { ids } = req.body; // ids là một mảng chứa các id của các bài viết cần xóa

    try {
        // Xóa các bài viết dựa trên ids
        await Post.deleteMany({ _id: { $in: ids } });

        res.status(200).json("Xóa bài viết thành công.");
    } catch (error) {
        next(error);
    }
}