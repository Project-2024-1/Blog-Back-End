import mongoose from "mongoose";

const Schema = mongoose.Schema;

const logSchema = new Schema({
    LogName: {
        type: String, 
        required: true,
    },
    
    LogDescription: {
        type: String, 
        default: ""
    },
    LogType: {
        type: String, 
        default: ""
    },
}, { timestamps : true});

const Log = mongoose.model('Log', logSchema);

export default Log;