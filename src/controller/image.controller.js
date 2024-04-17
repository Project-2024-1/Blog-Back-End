import Image from "../models/image.model.js";

import cloudinary from '../common/cloudDinary.config.js';

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     // folder: 'ckeditor-uploads',
//     allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'svg'],
//     // transformation: [{ width: 500, height: 500, crop: 'limit' }],
//     public_id: (req, file) => `ckeditor-uploads/${file.originalname}`,
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// export const uploadImageToCloudinary = (req, res) => {
//     if (req.files.length > 0) {
//         res.status(200).json({ message: 'Image uploaded successfully.', file: req.file });
//     } else {
//         res.status(400).json({ error: 'No files uploaded.' });
//     }
// };

export const uploadMiddleware = upload.single('image');


export const uploadImageToCloudinary = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const { folderName } = req.body;

        // Chuyển đổi dữ liệu buffer sang base64
        const base64Data = req.file.buffer.toString('base64');

        // Tải ảnh lên Cloudinary
        const result = await cloudinary.v2.uploader.upload(`data:${req.file.mimetype};base64,${base64Data}`, {
            folder: folderName,
            public_id: `${req.file.originalname}`,
            resource_type: 'auto'
        });

        // Trả về URL của ảnh trên Cloudinary
        res.status(200).json({ message: 'Image uploaded successfully.', code: 200, url: result.secure_url });
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).json({ error });
    }
};


export const getAllImages = async(req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json({ images });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllImageAndFolder = async(req, res) => {
    try {
        const { folderName } = req.body;

        // Lấy tất cả tài nguyên từ Cloudinary trong thư mục chỉ định
        const response = await cloudinary.v2.api.resources({
            type: 'upload',
            prefix: folderName + '/', // Tiền tố của tên file để lấy từ thư mục chỉ định
            max_results: 500,
        });

        if (response.resources) {
            const images = response.resources.filter((resource) => resource.resource_type === 'image');
            res.status(200).json({ images });
        } else {
            res.status(500).json({ error: 'Lỗi khi lấy dữ liệu từ Cloudinary: Response không chứa resources.' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu từ Cloudinary' });
    }
};


export const deleteImageCloud = async(req, res) => {
    try {
        const nameImage = req.params.nameImage;

        console.log("log", nameImage)
            // const result = await cloudinary.v2.api.delete_resources(nameImage);
        res.status(200).json({ success: true, message: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu từ Cloudinary' });
    }

}