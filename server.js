const express = require("express");
const router = require("./routes/index")
const error = require("./middleware/error")
const cors = require("cors")
const db = require("./database/index")
const {PORT,BACKEND_SERVER_PATH} = require("./config/index")
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors())
db()
app.use(router);


app.use(error)
app.listen(PORT,()=>{
    console.log("App is listening on "+PORT+ " at "+ BACKEND_SERVER_PATH)
})






