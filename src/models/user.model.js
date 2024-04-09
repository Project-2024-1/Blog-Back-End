import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserCode: {
        type: String,
    },
    UserName: {
        type: String, 
    },
    UserPasword: {
        type: String, 
    },
    UserEmail: {
        type: String,
    },
    UserAvatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    UserDescription: {
        type: String, 
        default: ""
    },
    UserRole: [{
        type: Schema.Types.ObjectId, 
        ref: 'Role'
    }],
    AccessToken: {
        type: String, 
        default: ""
    },
    UserStatus: {
        type: String, 
        default: 1
    },
}, { timestamps : true});

const User = mongoose.model('User', userSchema);

export default User;