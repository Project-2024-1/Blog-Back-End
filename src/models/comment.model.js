import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    CommentCode: {
        type: String,
        required: true,
        unique : true,
    },
    Post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      CommentText: {
        type: String, 
        required: true,
        unique : true,
    },
    CommentStatus: {
        type: String,
        required: true,
        unique : true,
    }
}, { timestamps : true});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;