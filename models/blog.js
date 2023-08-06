const mongoose = require("mongoose");

const {Schema} = mongoose

const blogSchema = new Schema ({
    title :{type:String,required:true},
    content:{type:String,required:true},
    description:{type:String,required:true},
    photo:{type:String,required:true},
    author:{type:String,required:true}
})


module.exports = mongoose.model("Blog",blogSchema,"blogs")