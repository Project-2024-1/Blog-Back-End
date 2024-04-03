import jwt from 'jsonwebtoken';
import roleList from '../common/role.js';
import { getRoleById, getRefreshTokenById } from '../database/getRoleId.js';

// export const checkAuthorization = async function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     // console.log(token);
//     if (token === null) return res.sendStatus(401);
//     jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
//         // console.log(user);
//         if (err) return res.sendStatus(403);

//         const userPremission = user.role;

//         // console.log(await checkPermission(req, userPremission));

//         if (!(await checkPermission(req, userPremission))) {
//             return res.sendStatus(403); // Không có quyền, trả về lỗi 403 - Forbidden
//         }
//         next();
//     });
// };

export const checkAuthorization = async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                try {
                    // Nếu token hết hạn, nhưng vẫn có thể lấy được thông tin người dùng
                    const decodedToken = jwt.decode(token);
                    const idUser = decodedToken.id;
                    const roleUser = decodedToken.role;
                    if (decodedToken && idUser) {
                        // Lấy ID từ token và truy xuất vào cơ sở dữ liệu
                        const user = await getRefreshTokenById(idUser);
                        if (user && user !== null) {
                            // User tồn tại, gán user vào req để sử dụng trong các middleware tiếp theo
                            jwt.verify(user, process.env.JWT_SECRET_REFRESH_TOKEN, async (err, user) => {
                                if (err) {
                                    return res.sendStatus(403); // Forbidden
                                }

                                const newToken = await generateNewToken(user._id, roleUser);

                                // console.log(newToken);

                                res.setHeader('Authorization', `Bearer ${newToken}`);

                                if (!(await checkPermission(req, roleUser)))
                                 {
                                    return res.sendStatus(403);
                                }
                                    
                            next();                                  
                            });
                            
                        } else {
                            // Không tìm thấy người dùng trong cơ sở dữ liệu
                            return res.sendStatus(403); // Forbidden
                        }
                    } else {
                        // Không thể giải mã token hoặc không có ID trong token
                        return res.sendStatus(403); // Forbidden
                    }
                } catch (error) {
                    // Lỗi xảy ra khi giải mã token hoặc truy xuất cơ sở dữ liệu
                    console.error(error);
                    return res.sendStatus(500); // Internal Server Error
                }
            } else {
                // Các lỗi khác (không phải là TokenExpiredError)
                console.error(err);
                return res.sendStatus(403); // Forbidden
            }
        } else {
            const userPremission = user.role;
            console.log(await checkPermission(req, userPremission));
            if (!(await checkPermission(req, userPremission))) {
                    return res.sendStatus(403); 
                }
                next();
        }
    });
};

const checkPermission = async (req, userPermissions) => {
    // Lấy ra tên route từ request
    const routeName = req.baseUrl + req.route.path;

    for (const permission of userPermissions) {
        let roleName = await getRoleById(permission);
        switch (routeName) {
            case 'api/post/addPost':
                if (roleName === roleList.addPost) return true;
                break;
            case 'api/post/deletePost':
                if (roleName === roleList.deletePost) return true;
                break;
            case '/api/role/':
                if (roleName === roleList.getRole) return true;
                break;
            case '/api/role/addRole':
                if (roleName === roleList.addRole) return true;
                break;
            case '/api/role/deleteRole':
                if (roleName === roleList.deleteRole) return true;
                break;
            default:
                return false;
        }
    }
    // Kiểm tra xem người dùng có quyền truy cập route không
    return false;
};


const generateNewToken = async (userId, roleUser) => {
    const newToken = jwt.sign({ id: userId, role: roleUser }, process.env.JWT_SECRET, { expiresIn: '60s' });
    return newToken;
};