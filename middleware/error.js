const Joi = require("joi")

function error (err,req,res,next){

    if (err instanceof Joi.ValidationError){
        errorResponse ={
            error:{message:err.details}
        }

        res.status(400).json(errorResponse)
    }


    const errorStatus = err.statusCode|| 500;

    const errorResponse = {
        error:{
            message:err.message||"Internal Server ERROR"
        }
    }

console.error(err)

res.status(errorStatus).json(errorResponse)
}

module.exports = error