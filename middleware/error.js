const Joi = require("joi")
const{ValidationError} =Joi;


module.exports = function(err,req,res,next){

    const errorStatus = err.statusCode|| 500;

    const errorResponse = {
        error:{
            message:err.message||"Internal Server ERROR"
        }
    }

console.error(err)

res.status(errorStatus).json(errorResponse)
}