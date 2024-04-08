import { errorHandle } from "../utils/error.js";


export const getBaseData = async (Model, id) => {
    try {
        if(id) {
            const data = await Model.findOne({_id: id});
            if(!data) {
                return errorHandle(
                    404,
                    "id Not Fround",
                    "id này không tồn tại",
                    ""
                )
            } 
            return {status: 200, data: data};
        } else {
            const data = await Model.find();
            if(!data) {
                return errorHandle(
                    404,
                    "Database Error",
                    "Có lỗi xảy ra, vui lòng liên hệ quản trị viên",
                    ""
                )
               
            }
            return {status: 200, data: data};
        }
    } catch (error) {
        return { status: 500, message: error.message };
    }
} 


// Hàm base để thêm hoặc cập nhật dữ liệu trong cơ sở dữ liệu
export const addOrUpdateBaseData = async (Model, id, newData) => {
    try {
      let dataToUpdate = null;
      if (id) {
        // Nếu có id được truyền lên, đó là yêu cầu sửa đổi dữ liệu
        dataToUpdate = await Model.findById(id);
        if (!dataToUpdate) {
          throw new Error("Dữ liệu không tồn tại.");
        }
        // Cập nhật dữ liệu mới
        Object.assign(dataToUpdate, newData);
      } else {
        // Nếu không có id được truyền lên, đây là yêu cầu thêm mới
        dataToUpdate = new Model(newData);
      }
      await dataToUpdate.save();
      return "Dữ liệu đã được lưu thành công.";
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // Hàm base để xóa dữ liệu từ cơ sở dữ liệu
  export const deleteBaseData = async (Model, id) => {
    try {
      await Model.findByIdAndDelete(id);
      return "Dữ liệu đã được xóa thành công.";
    } catch (error) {
      throw new Error("Xóa dữ liệu không thành công.");
    }
  };
  
  // Hàm base để xóa nhiều dữ liệu từ cơ sở dữ liệu
  export const deleteManyBaseData = async (Model, ids) => {
    try {
      await Model.deleteMany({ _id: { $in: ids } });
      return "Dữ liệu đã được xóa thành công.";
    } catch (error) {
      throw new Error("Xóa nhiều dữ liệu không thành công.");
    }
  };