const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const amqp = require("amqplib")

const health_route = require("./routes/health_route")
const {save_system_log} = require("./controllers/system_log_consumer")

dotenv.config()

const app = express()

const { MONGO_DB_URL, APP_ENV, ROUTES_PREFIX, AMQP_URL } = require('./configs/app_config')

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

app.listen(process.env.PORT || 8801 , () => {
    (async () => {
        try {
          const connection = await amqp.connect(AMQP_URL, { clientProperties: { "connection_name": "logging_service" } });
          const channel = await connection.createChannel();
      
          process.once("SIGINT", async () => {
            await channel.close();
            await connection.close();
          });
      
          await channel.assertQueue("system_log", { durable: false });
          await channel.consume(
            "system_log",
            (message) => {
              if (message) {
                save_system_log(message.content.toString())
                console.log(
                  "Received '%s'",
                  message.content.toString()
                );
              }
            },
            { noAck: true }
          );
      
        } catch (err) {
          console.warn(err);
        }
      })()

    console.log(`Vticket logging service (env: ${APP_ENV}) is running...`)
})
