import Role from "../models/role.model.js";
import User from "../models/user.model.js";

export const getRoleById = async (id) => {
    const role = await Role.findById(id);
    return role.RoleName;
}

export const getRefreshTokenById = async (id) => {
    // console.log(typeof(id) + " " + id);
    const user = await User.findById(id);
    return user.AccessToken;
}