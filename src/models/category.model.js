import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    CategoryName: {
        type: String,
    },
    CategoryDescription: {
        type: String,
        default: ""
    },
    CategoryStatus: {
        type: String,
        default: 1
    },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;