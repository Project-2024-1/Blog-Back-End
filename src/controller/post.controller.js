import {getDataBase, getUrlBase} from "../common/getDataBase.js";
import Post from "../models/post.model.js";

export const getPost = async (req, res) => {
        try {
            const idPost = req.body.PostCode;
            const pageSize = req.body.pageSize;
            const pageIndex = req.body.pageIndex;
            let posts = [];
            let total = "";
            if(idPost){
                posts = await Post.findOne({ PostCode: idPost });
                total = "1";
            } 
            else if (pageSize && pageIndex) {
                posts = await Post.find().skip((pageIndex - 1) * pageSize).limit(pageSize);
                total = await Post.count();
            } 
            else {
                posts = await Post.find();
                total = await Post.count();
            }
            res.json({ posts, total });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}

export const addPost = async (req, res, next) => {
    const {PostTitle, PostDescription, PostLink, PostImage, PostMetaTitle,PostMetaDescription, PostMetaKeyword, PostAuthor, PostTag, PostContent, PostStatus, PostSortOrder } = req.body;
    
    let newPostTitle = getDataBase(PostTitle, PostTitle);
    let newPostDescription = getDataBase(PostDescription, PostDescription);
    let newPostContent = getDataBase(PostContent, PostContent);
    let newPostStatus = getDataBase(PostStatus, PostStatus);
    let newPostSortOrder = getDataBase(PostSortOrder, PostSortOrder);
    let newPostMetaTitle  = getDataBase(PostMetaTitle, PostTitle);
    let newPostMetaDescription  = getDataBase(PostMetaDescription, PostDescription);
    let newPostMetaKeyword = getDataBase(PostMetaKeyword, PostTitle);
    let newPostLink = getUrlBase(PostTitle);

    const newPost = new Post({
        PostTitle : newPostTitle,
        PostDescription: newPostDescription,
        PostLink: newPostLink,
        PostImage,PostMetaTitle: newPostMetaTitle,
        PostMetaDescription: newPostMetaDescription,
        PostMetaKeyword: newPostMetaKeyword,
        PostAuthor,
        PostTag,
        PostContent: newPostContent,
        PostStatus: newPostStatus,
        PostSortOrder: newPostSortOrder
    });        
    try {
      await newPost.save();
      res.status(201).json("User created successfully");
    } catch (error) {
      next(error);
    }
}

export const deletePost = async (req, res) => {
    const idPost = req.body._id;

    try {
        await Post.findByIdAndDelete(idPost);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
}



