const express =require("express");
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const blogController = require( "../controllers/index")
const router =express.Router()

// Just testing the backend
router.get("/test",(req,res,next)=>{
    res.json("Just testing")
})


// get all blogs
router.get("/blogs/all",blogController.getAll)

// get blog by id
router.get("/blogs/:blogId",blogController.getById)

// post the blog post
router.post("/create",upload.single("file"),blogController.create)

// edit the blog post
router.put("/blogs/:blogId",blogController.update)

// delete the blog post
router.delete("/blogs/:blogId",blogController.delete)


module.exports = router