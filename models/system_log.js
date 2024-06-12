const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SystemLogSchema = new Schema(
    {
        logContent: {
            type: String,
            required: true
        }
    }, 
    { 
        timestamps: true 
    }
);

const SystemLog = mongoose.model('system_log', SystemLogSchema);

module.exports = SystemLog;
