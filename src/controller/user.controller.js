import User from "../models/user.model.js";

export const getUser = async (req, res) => {
        try {
            const idUser = req.body.UserCode;
            const pageSize = req.body.pageSize;
            const pageIndex = req.body.pageIndex;
            let users = [];
            let total = "";
            if(idUser){
                users = await User.findOne({ UserCode: idUser });
                total = "1";
            } 
            else if (pageSize && pageIndex) {
                 users = await User.find().skip((pageIndex - 1) * pageSize).limit(pageSize);
                 total = await User.count();
            } 
            else {
                users = await User.find();
                total = await User.count();
            }
            res.json({ users, total });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}



