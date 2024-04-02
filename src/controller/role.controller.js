import { getDataBase, getUrlBase } from "../common/getDataBase.js";
import Role from "../models/role.model.js";

export const getRole = async(req, res) => {
    try {
        const idRole = req.body._id;
        // const pageSize = req.body.pageSize;
        // const pageIndex = req.body.pageIndex;
        let roles = [];
        let total = "";
        if (idRole) {
            roles = await Role.findOne({ _id: idRole });
            total = "1";
        } else {
            roles = await Role.find();
            total = await Role.count();
        }
        res.json({ roles, total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addRole = async(req, res, next) => {

    const {
        RoleName,
        RoleDescription,
        id
    } = req.body;


    let newRoleName = getDataBase(RoleName, RoleName);
    let newRoleDescription = getDataBase(RoleDescription, RoleDescription);
    let roleToUpdate = null;
    if (id) {
        // Nếu có id được truyền lên, đó là yêu cầu sửa đổi dữ liệu
        roleToUpdate = await Role.findById(id);
        if (!roleToUpdate) {
            return res.status(404).json({ error: "Quyền này không tồn tại." });
        }
        // Cập nhật các trường dữ liệu mới
        roleToUpdate.RoleName = newRoleName;
        roleToUpdate.RoleDescription = newRoleDescription;
    } else {
        // Nếu không có id được truyền lên, đây là yêu cầu thêm mới
        roleToUpdate = new Role({
            RoleName: newRoleName,
            RoleDescription: newRoleDescription,
        });
    }
    try {
        await roleToUpdate.save();
        res.status(201).json("Quyền đã được lưu thành công.");
    } catch (error) {
        next(error);
    }
}

export const deleteRole = async(req, res) => {
    const idRole = req.body._id;

    try {
        await Role.findByIdAndDelete(idRole);
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
}

export const deleteManyRole = async(req, res, next) => {
    const { ids } = req.body; // ids là một mảng chứa các id của các bài viết cần xóa

    try {
        // Xóa các bài viết dựa trên ids
        await Role.deleteMany({ _id: { $in: ids } });

        res.status(200).json("Xóa quyền thành công.");
    } catch (error) {
        next(error);
    }
}