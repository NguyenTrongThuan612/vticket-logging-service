const router = require('express').Router()
const { health_check } = require("../controllers/health_controller")

router.get("/health", health_check)

module.exports = router