const Joi = require("joi")
const filestack = require("filestack-js")
const{FILE_STACK_API_KEY} = require("../config/index")
const Blog = require("../models/blog")
const blogController={

    async getById(req,res,next){
     const {blogId} = req.params;
     let blog
     try{
         blog = await  Blog.findOne({_id:blogId})
     }
     catch(error){
      return next(error)
     }
    res.status(200).json({blog})
    },




    async getAll(req,res,next){
      let blogs
      try{
     blogs = await Blog.find({})
      }
      catch(error){
        return next(error)
      }

      res.status(200).json({blogs})
    },
    





    async create(req,res,next){
      
      const uploadedFile = req.file;
        const blogSchema = Joi.object({
            title:Joi.string().min(5).max(50).required(),
            description:Joi.string().required(),
            content:Joi.string().required(),
            author:Joi.string().required().min(5).max(30),
        })


      const{error} =  blogSchema.validate(req.body)
      if(error){
        return next(error);
      }
      //validating the photo
const{title,content,description,author} = req.body;
      if(!uploadedFile){
        
        const error = {
          message:"File not included in the request",
          status:400
        }
      return  next(error)
      }
      if(uploadedFile.mimetype!==('image/jpeg'||'image/jpg'||'image/png')){
        const error ={
          message:"The uploaded file is not image",
          status:400
        }
      return  next(error)
      }
      if(uploadedFile.size>10*1024*1024){
        const error = {
          message:"The uploaded image size exceeded the limit",
          status:400
        }
      return   next(error)
      }

      const client = filestack.init(FILE_STACK_API_KEY)
     let photoResponse;
    try{
    photoResponse =  await client.upload(uploadedFile.buffer)
    }
    catch(error){
      return next(error)
    }

let response;
    try{
      const blogToSave = new Blog ({
        title,author,content,photo:photoResponse.url,description
      })

       response = await blogToSave.save()   
    }
    catch(error){ 
      return next(error)
    }
    res.status(201).json({blog:{
      response
    }})

    },








    async delete(req,res,next){

    },
    async update(req,res,next){

    }

};


module.exports = blogController;