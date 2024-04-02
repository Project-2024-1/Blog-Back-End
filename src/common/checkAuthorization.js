import jwt from 'jsonwebtoken';
import roleList from '../common/role.js';
import { getRoleById } from '../database/getRoleId.js';

export const checkAuthorization = async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);
    if (token === null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        // req.user = user;

        // console.log(user)
        const userPremission = user.role;

        console.log(await checkPermission(req, userPremission));

        if (!(await checkPermission(req, userPremission))) {
            return res.sendStatus(403); // Không có quyền, trả về lỗi 403 - Forbidden
        }
        next();
    });
};

const checkPermission = async (req, userPermissions) => {
    // Lấy ra tên route từ request
    const routeName = req.baseUrl + req.route.path;

    console.log(routeName);
    console.log(userPermissions);

    for (const permission of userPermissions) {
        let roleName = await getRoleById(permission);
        switch (routeName) {
            case 'api/post/addPost':
                console.log(roleName);
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
