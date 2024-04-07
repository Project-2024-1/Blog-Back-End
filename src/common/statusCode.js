const statusCodeList = {
    // Đăng nhập thành công
    LoginSuccess : 1,

    // Đăng nhập thất bại
    LoginFailed: 2,

    // Đăng ký thành công
    RegisterSuccess: 3,

    // Đăng ký thất bại
    RegisterFailed: 4,

    // User không tồn tại
    UserNotFound: 5,

    // Đăng nhập thành công với google
    LoginSuccessWithGoogle: 6,

    // Đăng nhập thành công với facebook
    LoginSuccessWithFacebook: 7,

    // Token hết hạn
    TokenExpired: 8,

    // Token lỗi hoặc không có Token truyền lên
    TokenError: 9, 

    // Không có quyền truy cấp với module này
    NotPermission: 10
}

export default statusCodeList;