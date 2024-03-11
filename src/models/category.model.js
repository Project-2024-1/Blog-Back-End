import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentActionSchema = new Schema({
    Comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    CommentActionType: {
        type: String, 
        unique : true,
        default: 1
    },
}, { timestamps : true});

const CommentAction = mongoose.model('CommentAction', commentActionSchema);

export default CommentAction;