const ROUTES_PREFIX = `/apis/vticket-logging-service/v1`
const APP_ENV = process.env.APP_ENV
const MONGO_DB_URL = process.env.MONGO_DB_URL
const AMQP_URL = process.env.AMQP_URL

module.exports = { 
    ROUTES_PREFIX, 
    APP_ENV,
    MONGO_DB_URL,
    AMQP_URL
}