let POST_SCHEMA = require("../model/postSchema")




//! creating post 

/*  @access public
    @http method => POST
    @endPoint => /api/create-post
*/


// exports.createPost = async (req,res) => {

//     let payload = await POST_SCHEMA.create(req.body);
//     res
//     .status(201)
//     .json({success:true, message : "successfully post created", payload})
// }

//! for file handling 

exports.createPost = async (req,res) => {

    let posts = {
        photo : req.file,
        title: req.body.title,
        description: req.body.description,
    }
    let payload = await POST_SCHEMA.create(posts);
    res
    .status(201)
    .json({success:true, message : "successfully post created", payload})
}

//! fetch all data 

/* 
   @access public
   @http method => GET
   @endPoint => /api/all-posts
*/

exports.allPosts = async(req,res)=>{

    try{
        let payload = await POST_SCHEMA.find({})
        res.status(200)
        .json({
            status: true,
            payload,
            message:"getting all data "
        })
    }catch(err)
    {
        console.log(err)
    }
}

//!  fetch single data 

/* 
   @access public
   @http method => GET
   @endPoint => /api/posts:id
*/

exports.fetchSinglePost = async(req,res) =>{
    try{
        let payload = await POST_SCHEMA.findOne({_id:req.params.id})
        res.status(200)
        .json({
            success:true,
            payload,
            message:"successfully fetching one data",
           
        })
    }
        catch(err)
        {
            console.log(err);
        }
    }

    //!  update 

    /* 
   @access public
   @http method => PUT
   @endPoint => /api/update-post/id
*/


exports.updatePost = async(req,res) =>{
    try{
        let updatePayload = await POST_SCHEMA.updateOne(
            {_id:req.params.id},
            {
                $set : req.body,
            },
           {
            new : true
           }
            )
        res.status(201)
        .json({
            success:true,
            message:"successfully updated ",
            updatePayload
        })
    }
        catch(err)
        {
            console.log(err);
        }
    }

    //! delete 

      /* 
   @access public
   @http method => DELETE
   @endPoint => /api/delete-post/id
*/



exports.deletePost = async(req,res) =>{
    try{
        
        await POST_SCHEMA.deleteOne({_id: req.params.id})
        res.status(203)
        .json({
            success:true,
            message:"successfully deleted ",
            
        })
    }
        catch(err)
        {
            console.log(err);
        }
    }


    //! for override 

          /* 
   @access public
   @http method => PATCH
   @endPoint => /api/update-post/id
*/


exports.updatePhoto = async(req,res) =>{
    try{
        
       let file = req.file;
       let payloadWithPhoto = await POST_SCHEMA.updateOne(
        {
            _id:req.params.id
        },
         {
            $set: {photo:file}
        },
        {
            new :false
        }
        );

        res.status(201).json({success:true, message:"successfully photo updated", payloadWithPhoto})
    }
        catch(err)
        {
            console.log(err);
        }
    }
