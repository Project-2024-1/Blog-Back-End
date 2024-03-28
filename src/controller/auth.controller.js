import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async(req, res, next) => {
    const { UserName, UserEmail, UserPasword } = req.body;
    const hashedPassword = bcryptjs.hashSync(UserPasword, 10);
    const newUser = new User({ UserName, UserEmail, UserPasword: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
        // res.status(500).json(error.message);
    }
};

export const signin = async(req, res, next) => {
    // get data from client
    const { UserEmail, UserPasword } = req.body;

    try {
        const validUser = await User.findOne({ UserEmail });
        if (!validUser) return next(errorHandle(404, "User not found!"));
        const validPassword = bcryptjs.compareSync(UserPasword, validUser.UserPasword);
        if (!validPassword) return next(errorHandle(401, "Wrong credentials!"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        // can have add expires in cookie to give user more time
        const { password: pass, ...rest } = validUser._doc;
        if (token) {
            await User.updateOne({}, { $set: { AccessToken: token } });
        }
        res
        //   .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({...rest, AccessToken: token });
    } catch (error) {
        next(error);
    }
};

export const google = async(req, res, next) => {
    // console.log("Login with google ...");  
    //   try {
    //     const user = await User.findOne({ email: req.body.email });
    //     if (user) {
    //       // trường hợp user đã có account trong db
    //       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //       const { password: pass, ...rest } = user._doc;
    //       res
    //         .cookie("access_token", token, { httpOnly: true })
    //         .status(200)
    //         .json(rest);
    //       console.log("Login Success with google");  
    //     }
    //     else {
    //       // user chưa tạo account, login lần đầu bằng google
    //       // slice là cắt chuỗi, tạo password ngẫu nhiên có độ dài 8 kí tự
    //       console.log("Case Login first with google"); 
    //       const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    //       const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
    //       const newUser = new User({
    //           UserName: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
    //           UserEmail: req.body.email,
    //           UserPasword: hashPassword,
    //           UserAvatar: req.body.photo
    //       });
    //       await newUser.save();
    //       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    //       const { password: pass, ...rest } = newUser._doc;
    //       res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    //     }
    //   } catch (error) {
    //     next(error);
    //   }
}