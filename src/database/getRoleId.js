import Role from "../models/role.model.js";

export const getRoleById = async (id) => {
    const role = await Role.findById(id);
    return role.RoleName;
}