import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserCode: {
        type: String,
        required: true,
        unique : true,
    },
    UserName: {
        type: String, 
        required: true,
        unique : true,
    },
    UserPasword: {
        type: String, 
        required: true,
        unique : true,
    },
    UserEmail: {
        type: String,
        required: true,
        unique : true,
    },
    UserAvatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    UserDescription: {
        type: String, 
        unique : true,
        default: ""
    },
    UserRole: {
        type: Array, 
        unique : true,
        default: [1]
    },
    AccessToken: {
        type: String, 
        unique : true,
        default: ""
    },
    UserStatus: {
        type: String, 
        unique : true,
        default: 1
    },
    // AccessTokenExpired: {
    //     type: Date + , 
    //     unique : true,
    // },
}, { timestamps : true});

const User = mongoose.model('User', userSchema);

export default User;