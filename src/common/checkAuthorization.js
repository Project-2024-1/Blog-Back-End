import jwt from 'jsonwebtoken';
import roleList from '../common/role.js';
import { getRoleById, getRefreshTokenById } from '../database/getRoleId.js';
import statusCodeList from './statusCode.js';
import { errorHandle } from '../utils/error.js';

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
    try {
        // console.log(req.headers);
        const authHeader = req.headers['authorization'];
        // console.log(authHeader);
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json(
               errorHandle(statusCodeList.Unauthorized, 'Unauthorized', 'Bạn không có quyền truy cập mục này', '')
            );
        }

        jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json(
                        errorHandle(
                            statusCodeList.TokenExpired,
                            'Token expired',
                            'Đã xảy ra lỗi. Liên hệ quản trị viên',
                            err));
                } else {
                    return res.status(403).json(
                        errorHandle(
                            statusCodeList.TokenError,
                            "Token invalid",
                            'Đã xảy ra lỗi. Liên hệ quản trị viên',
                            err
                        )
                    );
                }
            } else {
                const userPermission = user.role;
                const hasPermission = await checkPermission(req, userPermission);
                if (!hasPermission) {
                    return res.status(403).json(
                        errorHandle(
                            statusCodeList.NotPermission,
                            'Permission denied',
                            'Bạn không có quyền truy cập với module này',
                            err
                        )
                    );
                }
                next();
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            statusCode: 500,
        });
    }
};

const checkPermission = async(req, userPermissions) => {
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
            case '/api/log/':
                if (roleName === roleList.getLog) return true;
                break;
            default:
                return false;
        }
    }
    // Kiểm tra xem người dùng có quyền truy cập route không
    return false;
};


const generateNewToken = async(userId, roleUser) => {
    const newToken = jwt.sign({ id: userId, role: roleUser }, process.env.JWT_SECRET, { expiresIn: '60s' });
    return newToken;
};