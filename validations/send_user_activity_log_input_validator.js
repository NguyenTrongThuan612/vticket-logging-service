const { check } = require('express-validator')

const send_user_activity_log_input_validator = () => {
    return [
        check('userId')
            .isInt().withMessage("userId must be an interger")
            .exists().withMessage('userId is required'),
        check('activityType')
            .exists().withMessage('activityType is required'),
        check('timestamp')
            .optional().isISO8601().withMessage('Invalid timestamp format'),
        check('details')
            .optional()
    ]
}

module.exports = {
    send_user_activity_log_input_validator
}
