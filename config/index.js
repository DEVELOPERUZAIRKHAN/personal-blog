const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING
module.exports={
    PORT,
    BACKEND_SERVER_PATH,
    MONGODB_CONNECTION_STRING
}