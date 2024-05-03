import { getDataBase, getUrlBase } from "../common/getDataBase.js";
import Category from "../models/category.model.js";
import { errorHandle } from "../utils/error.js";
// import { getBaseData } from "./baseController.js";

export const getCategory = async(req, res) => {
    try {
        const { id } = req.query;
        // console.log(id)
        // const pageSize = req.body.pageSize;
        // const pageIndex = req.body.pageIndex;
        let categories = [];
        let total = "";
        if (id) {
            categories = await Category.findOne({ _id: id });
            total = "1";
        } else {
            categories = await Category.find();
            total = await Category.count();
        }
        res.json({ categories, total });
    } catch (error) {

        res.status(500).json(errorHandle(500, error.message, "Có lỗi xảy ra, vui loại liên hệ quản trị viên", error));
    }
}


export const addCategory = async(req, res, next) => {

    const {
        CategoryName,
        CategoryDescription,
        CategoryStatus
    } = req.body;

    let newCategoryName = getDataBase(CategoryName, CategoryName);
    let newCategoryDescription = getDataBase(CategoryDescription, CategoryDescription);
    let categoryToUpdate = null;

    // Nếu không có id được truyền lên, đây là yêu cầu thêm mới
    categoryToUpdate = new Category({
        CategoryName: newCategoryName,
        CategoryDescription: newCategoryDescription,
        CategoryStatus: CategoryStatus
    });
}
try {
    await categoryToUpdate.save();
    res.status(201).json(errorHandle(201, "Category created successfully.", "Them category thanh cong", ""));
} catch (error) {
    next(error);
}


export const updateCategory = async(req, res, next) => {

    const {
        CategoryName,
        CategoryDescription,
        CategoryStatus,
        id
    } = req.body;

    let newCategoryName = getDataBase(CategoryName, CategoryName);
    let newCategoryDescription = getDataBase(CategoryDescription, CategoryDescription);
    let categoryToUpdate = null;

    try {
        await Category.findByIdAndUpdate(id, {
            CategoryName: newCategoryName,
            CategoryDescription: newCategoryDescription,
            CategoryStatus: CategoryStatus
        }, { new: true });
        res.status(200).json(errorHandle(200, "Category updated successfully.", "Cap nhat category thanh cong", ""));
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the post' });
    }
}

export const deleteCategory = async(req, res) => {
    const idCate = req.body._id;

    try {
        await Category.findByIdAndDelete(idCate);
        res.status(200).json(errorHandle(200, "Category deleted successfully.", "Xoa category thanh cong", ""));
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
}

export const deleteManyCategory = async(req, res, next) => {
    const { ids } = req.body; // ids là một mảng chứa các id của các bài viết cần xóa

    try {
        // Xóa các bài viết dựa trên ids
        await Category.deleteMany({ _id: { $in: ids } });

        res.status(200).json(errorHandle(200, "Xoa category thanh cong.", "Xoa category thanh cong.", ""));
    } catch (error) {
        next(error);
    }
}