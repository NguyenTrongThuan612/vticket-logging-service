const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const health_route = require("./routes/health_route")
const user_activity_route = require("./routes/user_activity_log_route")

dotenv.config()

const app = express()

const { MONGO_DB_URL, APP_ENV, ROUTES_PREFIX } = require('./configs/app_config')

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

mongoose.connect(
    MONGO_DB_URL,
    { useNewUrlParser: true }
)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use(ROUTES_PREFIX, health_route)
app.use(ROUTES_PREFIX, user_activity_route)

app.listen(process.env.PORT || 8801 , () => {
    console.log(`Vticket logging service (env: ${APP_ENV}) is running...`)
})