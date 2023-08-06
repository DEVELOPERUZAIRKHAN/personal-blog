const express = require("express");
const router = require("./routes/index")
const db = require("./database/index")
const {PORT,BACKEND_SERVER_PATH} = require("./config/index")
const app = express();
db()
app.use(router);


app.use()
app.listen(PORT,()=>{
    console.log("App is listening on "+PORT+ " at "+ BACKEND_SERVER_PATH)
})






