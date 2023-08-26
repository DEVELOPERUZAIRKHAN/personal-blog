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
   return res.status(200).json({blog})
    },




    async getAll(req,res,next){
      let blogs
      try{
     blogs = await Blog.find({})
      }
      catch(error){
        return next(error)
      }

    return  res.status(200).json({blogs})
    },
    





    async create(req,res,next){
      
      const uploadedFile = req.file;
        const blogSchema = Joi.object({
            title:Joi.string().min(5).max(80).required(),
            description:Joi.string().required().max(200).min(50),
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
      if((uploadedFile.mimetype!=='image/jpeg')&&(uploadedFile.mimetype!=='image/jpg')&&(uploadedFile.mimetype!=='image/png')){
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
     const {blogId} = req.params;
let response;
     try{
       response = await Blog.deleteOne({_id:blogId})

     }
     catch(error){
      return next(error)
     }
     res.status(201).json(response)
    },






    async update(req,res,next){

      const {blogId} = req.params;
// validating the text of the blog
     const blogSchema = Joi.object({
        title:Joi.string().min(5).max(80).required(),
        description:Joi.string().required().min(50).max(  200),
        content:Joi.string().required(),
        author:Joi.string().min(5).max(30).required(),
      })
      try{

        const{error}  =  await  blogSchema.validate(req.body);
        if(error){
          return next(error)
        }
      }
      catch(error){
        return next(error)
      }
    console.log(req.body)

    if(req.file){
    const client =  filestack.init(FILE_STACK_API_KEY)
    if(req.file.mimetype!==('image/jpeg'||'image/jpg'||'image/png')) {
      const error = {
        status :400,
        message:"The file submitted is not an image file"
      }
      return next(error)
    } 
    
    if(req.file.size>10*1024*1024){
        const error ={
          status : 400,
          message:"The Image size exceeded the limit"
        }
        return next(error)
      }
let photoResponse;
      try{
        photoResponse = await client.upload(req.file.buffer)
}
catch(error){
  return next(error)
}
let response ;
req.body.photo = photoResponse.url;
try{
  response = await Blog.updateOne({_id:blogId},{$set:req.body})
  
}
catch(error){
  const eror ={
    status:400,
    message:"Error updating the blog"
  }
  return next(eror);

}
return res.status(201).json(response)
    }

      let response;
      try{
      response = await Blog.updateOne({_id:blogId},{$set:req.body})
        }
        catch(error){
          const eror ={
            status:400,
            message:"Error Updating blog"
          }
          return next (eror)
        }
    return  res.status(202).json({response})
    }
};
module.exports = blogController;