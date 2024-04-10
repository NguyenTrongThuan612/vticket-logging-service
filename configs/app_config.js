const ROUTES_PREFIX = `/vticket-logging-service/v1`
const APP_ENV = process.env.APP_ENV
const MONGO_DB_URL = process.env.MONGO_DB_URL

module.exports = { 
    ROUTES_PREFIX, 
    APP_ENV,
    MONGO_DB_URL,
}