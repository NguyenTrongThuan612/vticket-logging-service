const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserActivityLogSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    activityType: {
        type: String,
        required: true
    },
    details: {
        type: Schema.Types.Mixed
    }
});

const UserActivityLog = mongoose.model('user_activity_log', UserActivityLogSchema);

module.exports = UserActivityLog;
