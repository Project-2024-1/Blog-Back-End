import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    PostTitle: {
        type: String,
        required: true,
    },
    PostDescription: {
        type: String,
        required: true,
        default: "No description"
    },
    PostLink: {
        type: String,
    },
    PostImage: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    // render theo title
    PostMetaTitle: {
        type: String,
        default: ""
    },
    // render theo description
    PostMetaDescription: {
        type: String,
        default: ""
    },
    // render theo title
    PostMetaKeyword: {
        type: String,
        default: ""
    },
    PostAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến mô hình User
    },
    PostTag: {
        type: String,
        default: ""
    },
    PostContent: {
        type: String,
        default: ""
    },
    PostStatus: {
        type: String,
        default: 1
    },
    PostSortOrder: {
        type: String,
        default: 1
    },
    PostTotalView: {
        type: String,
        default: 0
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;