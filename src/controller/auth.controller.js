import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import statusCodeList from "../common/statusCode.js"
import jwt from "jsonwebtoken";
import { getRefreshTokenById, getRoleUser } from "../database/getRoleId.js";
// import session from "express-session";

// Đăng kí
export const signup = async(req, res, next) => {
    const { UserName, UserEmail, UserPasword, UserRole } = req.body;
    const hashedPassword = bcryptjs.hashSync(UserPasword, 10);
    const newUser = new User({ UserName, UserEmail, UserPasword: hashedPassword, UserRole });
    try {
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
        // res.status(500).json(error.message);
    }
};
// Đăng nhập
export const signin = async(req, res, next) => {
    // get data from client
    const { UserEmail, UserPassword } = req.body;

    try {
        const validUser = await User.findOne({ UserEmail });
        if (!validUser) return res.status(404).json(errorHandle(statusCodeList.LoginFailed, "Login failed to user not found!", "Không tìm thấy User", ""));
        const validPassword = bcryptjs.compareSync(UserPassword, validUser.UserPassword);
        if (!validPassword) return res.status(401).json(errorHandle(statusCodeList.LoginFailed, "Wrong credentials!", "Thông tin mật khẩu không đúng", ""));
        const token = jwt.sign({ id: validUser._id, role: validUser.UserRole }, process.env.JWT_SECRET, { expiresIn: "30s" });
        // req.session.token = token;

        const refreshToken = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: "15d" });
        // can have add expires in cookie to give user more time
        // const { password : pass, ...rest } = validUser._doc;
        if (refreshToken) {
            await User.updateOne({ UserEmail: validUser.UserEmail }, { $set: { AccessToken: refreshToken } });
        }
        res
            .status(200)
            .json({
                Message: "Login Success",
                statusCode: statusCodeList.LoginSuccess,
                AccessToken: token,
                RefreshToken: refreshToken,
                UserRole: validUser.UserRole
            });
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message);
    }
};
export const google = async(req, res, next) => {
    console.log("Login with google ...");
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // trường hợp user đã có account trong db
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
            console.log("Login Success with google");
        } else {
            // user chưa tạo account, login lần đầu bằng google
            // slice là cắt chuỗi, tạo password ngẫu nhiên có độ dài 8 kí tự
            console.log("Case Login first with google");
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                UserName: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                UserEmail: req.body.email,
                UserPasword: hashPassword,
                UserAvatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

export const getToken = async(req, res, next) => {
    const newToken = res.locals.newToken
    console.log(newToken)
}

export const refreshToken = async(req, res, next) => {
    try {
        const { rsToken } = req.body;

        // Decode the refreshToken to get the user ID
        const decodedRsToken = jwt.verify(rsToken, process.env.JWT_SECRET_REFRESH_TOKEN);
        const idUser = decodedRsToken.id;

        // Get the access token and role for the user
        const accessToken = await getRefreshTokenById(idUser);
        const roleToken = await getRoleUser(idUser);

        // Check if the received refreshToken matches the stored refreshToken
        if (rsToken !== accessToken) {
            console.log("Refresh token không hợp lệ");
            return res.sendStatus(403); // Send Forbidden status if refresh token is invalid
        }

        // Generate a new access token with the same user ID and role
        const newAccessToken = jwt.sign({ id: idUser, role: roleToken }, process.env.JWT_SECRET, { expiresIn: "30s" });

        // Send the new access token to the client
        res.status(200).json({
            token: newAccessToken,
            message: errorHandle(
              statusCodeList.GetRefreshTokenSuccess,
              "Token refreshed",
              "Token đã được refresh thành công",
              ""
            ),
          });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.sendStatus(500); // Internal Server Error if any error occurs
    }
}