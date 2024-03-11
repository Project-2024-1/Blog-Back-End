import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    PostCode: {
        type: String,
        required: true,
        unique : true,
    },
    PostTitle: {
        type: String, 
        required: true,
        unique : true,
    },
    PostDescription: {
        type: String, 
        required: true,
        unique : true,
        default: "No description"
    },
    PostLink: {
        type: String,
        required: true,
        unique : true,
    },
    PostImage: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    // render theo title
    PostMetaTitle: {
        type: String, 
        unique : true,
        default: ""
    },
    // render theo description
    PostMetaDescription: {
        type: Array, 
        unique : true,
        default: [1]
    },
    // render theo title
    PostMetaKeyword: {
        type: String, 
        unique : true,
        default: ""
    },
    PostAuthor: {
        type: String, 
        unique : true,
        default: 123
    },
    PostTag: {
        type: String, 
        unique : true,
        default: ""
    },
    PostContent: {
        type: String, 
        unique : true,
        default: ""
    },
    PostStatus: {
        type: String, 
        unique : true,
        default: 1
    },
    PostSortOrder: {
        type: String, 
        unique : true,
        default: 1
    },
    PostTotalView: {
        type: String, 
        unique : true,
        default: 0
    },
}, { timestamps : true});

const Post = mongoose.model('Post', postSchema);

export default Post;