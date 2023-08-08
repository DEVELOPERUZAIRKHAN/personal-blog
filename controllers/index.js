const Joi = require("joi")
const filestack = require("filestack-js")
const{FILE_STACK_API_KEY} = require("../config/index")
const crypto = require("crypto");
const Blog = require("../models/blog")
const blogController={

    async getById(req,res,next){

    },
    async getAll(req,res,next){

    },

    async create(req,res,next){
      
      // const myStr = crypto.randomBytes(13).toString("hex");
        // const blogSchema = Joi.object({
        //     title:Joi.string().min(5).max(50).required(),
        //     description:Joi.string().required(),
        //     content:Joi.string().required(),
        //     author:Joi.string().required().min(5).max(30),
        //     photo:Joi.string().required()
        // })


      // const{error} =  blogSchema.validate(req.body)
      // if(error){
        // return next(error);
      // }
      
      const client = filestack.init(FILE_STACK_API_KEY)
      const {title,content} = req.body;
      const uploadedFile = req.file;
     let photoResponse ;
    try{
    photoResponse =  await client.upload(uploadedFile.buffer)
    console.log(photoResponse)
    console.log("url" ,photoResponse.url)
    }
    catch(error){
      return next(error)
    }


    // try{
    //   const blogToSave = new Blog ({
    //     title,author,content,photo:photoResponse.url,description
    //   })

      // let response = await blogToSave.save()  
      res.status(201).json({url:photoResponse.url,content,title})
    // }
    // catch(error){ 
    //   return next(error)
    // }

    },
    async delete(req,res,next){

    },
    async update(req,res,next){

    }

};


module.exports = blogController;