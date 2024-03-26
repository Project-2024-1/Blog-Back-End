import fs from 'fs';


// const multer = require('multer');
// const cloudinary = require('../../config/cloudinary.config');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: 'ckeditor-uploads',
//     allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
//     // transformation: [{ width: 500, height: 500, crop: 'limit' }],
//     public_id: (req, file) => file.originalname,
// });
import path from 'path';
import Image from "../models/image.model.js";

export const uploadImageToBase64 = async (req, res) => {
    try {
        // Lấy tệp ảnh từ req.file
        const imageFile = req.file;   

        // Đọc dữ liệu hình ảnh từ tệp
        const imageBuffer = fs.readFileSync(imageFile.path);

        // Chuyển đổi dữ liệu hình ảnh thành base64
        const base64Image = imageBuffer.toString('base64');

        // Lưu base64Image vào cơ sở dữ liệu hoặc thực hiện các thao tác khác ở đây
        // Ví dụ: Lưu vào cơ sở dữ liệu sử dụng Mongoose
        const imageUrl = new Image({
            image: base64Image
        });
        await imageUrl.save();

        // Xóa tệp ảnh sau khi đã đọc và lưu dữ liệu
        fs.unlinkSync(imageFile.path);

        // Trả về thông báo thành công
        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Error uploading image' });
    }
};


export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json({ images });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// const uploadImageToCloudinary = async(imageFile, folderName) => {
//     const imageBuffer = imageFile.buffer;
//     const dataUrl = `data:${imageFile.mimetype};base64,${imageBuffer.toString('base64')}`;

//     // Thực hiện tải ảnh lên Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(dataUrl, {
//         resource_type: 'image',
//         folder: "web",
//     });
//     console.log(uploadResult);
//     return uploadResult;
// };
// const getAllImageAndFolder = async(req, res) => {
//     try {
//         // Lấy tất cả tài nguyên từ Cloudinary (tối đa 500 kết quả)
//         const response = await cloudinary.api.resources({
//             max_results: 500,
//         });
//         // console.log(response)
//         if (response.resources) {
//             const images = response.resources.filter((resource) => resource.resource_type === 'image');
//             const folders = response.resources.filter((resource) => resource.resource_type === 'folder');
//             res.status(200).json({ images, folders });
//         } else {
//             res.status(500).json({ error: 'Lỗi khi lấy dữ liệu từ Cloudinary: Response không chứa resources.' });
//         }

//     } catch (error) {
//         // Xử lý lỗi và trả về mã trạng thái 500
//         console.error(error);
//         res.status(500).json({ error: 'Lỗi khi lấy dữ liệu từ Cloudinary' });
//     }
// }

// const deleteImageCloud = async(req, res) => {
//     try {
//         const publicId = req.params.publicId
//         console.log("log", publicId)
//         const result = await cloudinary.uploader.destroy(publicId);
//         res.status(200).json({ success: true, message: 'success' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Lỗi khi lấy dữ liệu từ Cloudinary' });
//     }

// }

