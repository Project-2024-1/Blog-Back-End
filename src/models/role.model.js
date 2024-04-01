import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    RoleName: {
        type: String, 
        required: true,
    },
    
    RoleDescription: {
        type: String, 
        default: ""
    },
}, { timestamps : true});

const Role = mongoose.model('Role', roleSchema);

export default Role;