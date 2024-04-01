function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        // req.user = user;
        const userPremission = user.UserRole;

        if (!checkPermission(req, userPremission)) {
            return res.sendStatus(403); // Không có quyền, trả về lỗi 403 - Forbidden
        }
        next();
    })};


    function checkPermission(req, userPermissions) {
        // Lấy ra tên route từ request
        const routeName = req.baseUrl + req.route.path;
        
        // Kiểm tra xem người dùng có quyền truy cập route không
        switch (routeName) {
            case '/':
                return userPermissions.includes('getPost');
            case '/addPost':
                return userPermissions.includes('addPost');
            case '/deletePost':
                return userPermissions.includes('deletePost');
            case '/deleteManyPost':
                return userPermissions.includes('deleteManyPost');
            default:
                return false;
        }
    }