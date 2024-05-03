import { getDataBase, getUrlBase } from "../common/getDataBase.js";
import Post from "../models/post.model.js";
import { errorHandle } from "../utils/error.js";
import { getBaseData } from "./baseController.js";

export const getPost = async(req, res) => {
    try {
        const { id, pageSize, pageIndex } = req.query;
        let posts = [];
        let total = "";
        if (id) {
            posts = await Post.findOne({ _id: id });
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
        res.status(500).json(errorHandle(500, error.message, "Có lỗi xảy ra, vui loại liên hệ quản trị viên", error));
    }
}

// export const getPost = async (req, res) => {
//     try {
//       const { id } = req.query;
//       let posts = [];
//       let total = "";
//       if (id) {
//         posts = await getBaseData(Post, id);
//         total = "1";
//       } else {
//         posts = await getBaseData(Post);
//         total = await Post.count();
//       }
//       res.json({ posts, total });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// }

export const addPost = async(req, res, next) => {
    const {
        PostTitle,
        PostDescription,
        PostLink,
        PostImage,
        PostMetaTitle,
        PostMetaDescription,
        PostMetaKeyword,
        PostAuthor,
        PostTag,
        PostContent,
        PostStatus,
        PostSortOrder,
        PostCategory
    } = req.body;

    let newPostTitle = getDataBase(PostTitle, PostTitle);
    let newPostDescription = getDataBase(PostDescription, PostDescription);
    let newPostContent = getDataBase(PostContent, PostContent);
    let newPostStatus = getDataBase(PostStatus, PostStatus);
    let newPostSortOrder = getDataBase(PostSortOrder, PostSortOrder);
    let newPostMetaTitle = getDataBase(PostMetaTitle, PostTitle);
    let newPostMetaDescription = getDataBase(PostMetaDescription, PostDescription);
    let newPostMetaKeyword = getDataBase(PostMetaKeyword, PostTitle);
    let newPostLink = "";
    if (PostLink === "") {
        newPostLink = getUrlBase(PostTitle);
    } else {
        newPostLink = getDataBase(PostLink, PostLink);
    }


    let postToUpdate = null;
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
        PostSortOrder: newPostSortOrder,
        PostCategory: PostCategory
    });

    try {
        await postToUpdate.save();
        res.status(201).json("Bài viết đã được lưu thành công.");
    } catch (error) {
        next(error);
    }
}

export const updatePost = async(req, res) => {
    const {
        PostTitle,
        PostDescription,
        PostLink,
        PostImage,
        PostMetaTitle,
        PostMetaDescription,
        PostMetaKeyword,
        PostAuthor,
        PostTag,
        PostContent,
        PostStatus,
        PostSortOrder,
        id,
        PostCategory
    } = req.body;

    let newPostTitle = getDataBase(PostTitle, PostTitle);
    let newPostDescription = getDataBase(PostDescription, PostDescription);
    let newPostContent = getDataBase(PostContent, PostContent);
    let newPostStatus = getDataBase(PostStatus, PostStatus);
    let newPostSortOrder = getDataBase(PostSortOrder, PostSortOrder);
    let newPostMetaTitle = getDataBase(PostMetaTitle, PostTitle);
    let newPostMetaDescription = getDataBase(PostMetaDescription, PostDescription);
    let newPostMetaKeyword = getDataBase(PostMetaKeyword, PostTitle);
    let newPostLink = "";
    if (PostLink === "") {
        newPostLink = getUrlBase(PostTitle);
    } else {
        newPostLink = getDataBase(PostLink, PostLink);
    }

    try {
        await Post.findByIdAndUpdate(id, {
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
            PostSortOrder: newPostSortOrder,
            PostCategory: PostCategory
        }, { new: true });
        res.status(200).json("Bài viết đã được cập nhật.");
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the post' });
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