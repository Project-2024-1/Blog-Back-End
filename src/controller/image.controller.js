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

export const uploadImageToBase64 = async (req, res) => {
    try {
        // Lấy tệp ảnh từ req.file
        const imageFile = req.file;
        const imageFilePath = imageFile.path;

        // Đọc dữ liệu ảnh từ tệp
        const imageBuffer = fs.readFileSync(imageFilePath);

        // Tạo Blob từ dữ liệu ảnh
        const blob = new Blob([imageBuffer], { type: imageFile.mimetype });

        // Lưu đường dẫn mới vào cơ sở dữ liệu
        const imageURL = URL.createObjectURL(blob);

        // Xóa tệp ảnh tạm thời
        fs.unlinkSync(imageFilePath);

        // Trả về URL của Blob
        res.status(200).json({ imageURL });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Error uploading image' });
    }
};


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

