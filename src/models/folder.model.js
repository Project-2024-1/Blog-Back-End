import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
},{ timestamps : true});

const Folder = mongoose.model('Folder', folderSchema);

export default Folder;
