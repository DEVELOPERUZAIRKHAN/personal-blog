const mongoose = require("mongoose");
const {MONGODB_CONNECTION_STRING} = require("../config/index")
const db= async()=>{
mongoose.set("strictQuery",false)

try{
  const conn = await  mongoose.connect(MONGODB_CONNECTION_STRING)
  console.log(`mongodb connected to the server ${conn.connection.host}`)
}
catch(error){
    console.log(`Error connecting to the mongodb on ${error}`)
}

}

module.exports= db

