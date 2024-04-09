import statusCodeList from "../common/statusCode.js";
import User from "../models/user.model.js";
import { errorHandle } from "../utils/error.js";

export const getUser = async (req, res) => {
        try {
            const {idUser , pageSize, pageIndex} = req.query;
            console.log(idUser)
            let users = [];
            let total = "";
            if(idUser){
                users = await User.findOne({ UserCode: idUser });
                total = "1";
            } 
            else if (pageSize && pageIndex) {
                 users = await User.find().skip((pageIndex - 1) * pageSize).limit(pageSize);
                 total = await User.count();
            } 
            else {
                users = await User.find();
                total = await User.count();
            }
            console.log(users)
            res.json({ users, total });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}

export const addUser = async (req, res) => {
    try {
        const { id, UserCode, UserName, UserEmail, UserAvatar, UserDescription, UserRole, UserStatus } = req.body;

        if (id) {
            // Nếu có id được truyền lên, đây là phương thức sửa User
            const updatedUser = await User.findByIdAndUpdate(id, { UserCode, UserName, UserEmail, UserAvatar, UserDescription, UserRole, UserStatus }, { new: true });

            if (!updatedUser) {
                return res.status(404).json(errorHandle(statusCodeList.UserNotFound, "User not found.", "User không tồn tại", ""));
            }

            res.status(200).json(errorHandle(statusCodeList.UserUpdateSuccess, "User updated successfully.", "Cập nhật thông tin User thành công", ""));
        } else {
            // Nếu không có id được truyền lên, đây là phương thức thêm User
            const user = new User({ UserCode, UserName, UserEmail, UserAvatar, UserDescription, UserRole, UserStatus });
            await user.save();

            res.status(200).json(errorHandle(statusCodeList.UserCreateSuccess, "User created successfully.", "Thêm thông tin User thành công", ""));
        }
    } catch (error) {
        res.status(500).json(errorHandle(statusCodeList.UserCreateFailed, "User created failed.", "Thêm thông tin User thất bại, vui lòng liên hệ quản trị viên", error));
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedUser = await User.findByIdAndDelete(id);        
        if (!deletedUser) {
            return res.status(404).json(errorHandle(statusCodeList.UserNotFound, "User not found.", "User không tồn tại", ""));
        }
        res.status(200).json(errorHandle(statusCodeList.UserDeleteSuccess, "User deleted successfully.", "Xóa này bài viết", ""));
    } catch (error) {
        res.status(500).json(errorHandle(statusCodeList.UserDeleteFailed, "User deleted failed.", "Xóa này bài viết thát bị", error));
    }}


    export const changePassword = async (req, res) => {
        try {
            const { id, passwordOld, passwordNew } = req.body;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json(errorHandle(statusCodeList.UserNotFound, "User not found.", "User không tồn tại", ""));
            }

            if (user.UserPasword !== passwordOld) {
                return res.status(400).json(errorHandle(statusCodeList.UserUpdateFailed, "Password old incorrect.", "Mật khẩu cũ không đúng", ""));
            } 

            user.UserPasword = passwordNew;
            await user.save();

            res.status(200).json(errorHandle(statusCodeList.UserUpdateSuccess, "User updated successfully.", "Đổi mật khảu thành công", ""));
        } catch (error) {
            res.status(500).json(errorHandle(statusCodeList.UserDeleteFailed, "User deleted failed.", "Xóa này bài viết thát bị", error));
        }}