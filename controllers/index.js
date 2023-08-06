const Joi = require("joi")
const filestack = require("filestack-js")
const{FILE_STACK_API_KEY} = require("../config/index")
const blogController={


    async getById(req,res,next){

        
    },
    async getAll(req,res,next){

    },
    async create(req,res,next){

        const blogSchema = Joi.object({
            title:Joi.string().min(5).max(50).required(),
            description:Joi.string().min(50).max(150).required(),
            content:Joi.string().required(),
            author:Joi.string().required().min(5).max(30),
            photo:Joi.string().required()
        })


      const{error} =  blogSchema.validate(req.body)
      if(error){
        return next()
      }
      
      const {title,author,content,photo,description} = req.body;

     const client = filestack.init(FILE_STACK_API_KEY)
     let response ;
    try{

    response =  await client.upload(photo)
    }

    catch(error){
      return next(error)
    }

    




    },
    async delete(req,res,next){

    },
    async update(req,res,next){

    }

};


module.exports = blogController;