const { validationResult } = require('express-validator')
const UserActivityLog = require("../models/user_activity_log")

const send_user_activity_log = async (req, res, next) => {
    try {
        input_errors = validationResult(req)

        if (!input_errors.isEmpty()) {
            return res.json(
                {
                    "data": input_errors,
                    "status": 5,
                    "message": "Invalid input!"
                }
            )
        }
        
        const { userId, activityType, timestamp, details } = req.body;
        const new_log = new UserActivityLog(
            {
                userId,
                activityType,
                timestamp,
                details
            }
        )

        validate = new_log.validateSync()

        if (!!validate) {
            return res.json(
                {
                    "data": validate,
                    "status": 5,
                    "message": "Model validate failed!"
                }
            )
        }

        is_saved = await new_log.save()

        if (is_saved)
        {
            return res.json(
                {
                    "data": null,
                    "status": 1,
                    "message": "success"
                }
            )
        }
        else 
        {
            return res.json(
                {
                    "data": null,
                    "status": 6,
                    "message": "internal server error"
                }
            )
        }
    }
    catch (ex)
    {
        console.log(ex)
        return res.json(
            {
                "data": ex.toString(),
                "status": 0,
                "message": "Internal server error!"
            }
        )
    }
}

module.exports = {
    send_user_activity_log
}