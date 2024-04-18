import { getDataBase, getUrlBase } from "../common/getDataBase.js";
import statusCodeList from "../common/statusCode.js";
import Log from "../models/log.model.js";
import { errorHandle } from "../utils/error.js";
// import { getBaseData } from "./baseController.js";

export const getLog = async(req, res) => {
    try {
        // const { id } = req.query;
        // console.log(id)
        // const pageSize = req.body.pageSize;
        // const pageIndex = req.body.pageIndex;
        let logs = [];
        let total = "";
        logs = await Log.find();
        total = await Log.count();
        res.status(200).json({ logs, total });
    } catch (error) {
        
        res.status(500).json(errorHandle(500, error.message, "Có lỗi xảy ra, vui loại liên hệ quản trị viên", error));
    }
}


export const addLog = async(req, res, next) => {

    const {
        LogName,
        LogDescription,
        LogType
    } = req.body;
    let newLogname = getDataBase(LogName, LogName);
    let newLogDescription = getDataBase(LogDescription, LogDescription);
    let newLogType = getDataBase(LogType, LogType);
    
        // Nếu không có id được truyền lên, đây là yêu cầu thêm mới
      let logToUpdate = new Log({
            LogName: newLogname,
            LogDescription: newLogDescription,
            LogType: newLogType
        });
    try {
        await logToUpdate.save();
        res.status(201).json(errorHandle(statusCodeList.logInsertSuccess, "Log created successfully.", "Thêm mới log thành công", ""));
    } catch (error) {
        res.status(500).json(errorHandle(statusCodeList.logInsertFailed, "Log created failed.", "Them log that bai, vui long lien he voi admin", error));
        next(error);
    }
}

// export const deleteRole = async(req, res) => {
//     const idRole = req.body._id;

//     try {
//         await Role.findByIdAndDelete(idRole);
//         res.status(200).json({ message: 'Role deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while deleting the post' });
//     }
// }

// export const deleteManyRole = async(req, res, next) => {
//     const { ids } = req.body; // ids là một mảng chứa các id của các bài viết cần xóa

//     try {
//         // Xóa các bài viết dựa trên ids
//         await Role.deleteMany({ _id: { $in: ids } });

//         res.status(200).json("Xóa quyền thành công.");
//     } catch (error) {
//         next(error);
//     }
// }