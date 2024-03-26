import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    image: {
        type: String, 
        required: true,
    },
    
}, { timestamps : true});

const Image = mongoose.model('Image', imageSchema);

export default Image;