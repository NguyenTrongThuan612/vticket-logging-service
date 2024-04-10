const router = require('express').Router()
const { send_user_activity_log } = require("../controllers/user_activity_log_controller")
const { send_user_activity_log_input_validator } = require("../validations/send_user_activity_log_input_validator")

router.post("/user-activity", send_user_activity_log_input_validator(), send_user_activity_log)

module.exports = router