const express = require("express")
const{ postModel} = require("../models/posts.model")
const {auth} = require("../middlewears/auth.middlewear")

const postRouter= express.Router()
postRouter.use(auth);


postRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const post = new postModel(payload);
    await post.save();
    res
      .status(200)
      .json({ msg: "a new post has been created", added_post: payload });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});


postRouter.get("/",async (req, res) => {
  try {
    const post = await postModel.find({ userID: req.body.userID });
    res.status(200).json({ post_data: post });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

postRouter.patch("/update/:postID", async (req, res) => {
    const postID = req.params.postID
    try {
        
      const post = await postModel.findById(postID);
      if(post.userID === req.body.userID){
        await postModel.findByIdAndUpdate({_id:postID}, req.body);
        res.status(200).json({msg:"post updated"});
      }
      else{
        res.status(200).json({msg:"you are not authorized"});
      }
      
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });

  postRouter.delete("/delete/:postID", async (req, res) => {
    const postID = req.params.postID
    try {
        
      const post = await postModel.findById(postID);
      if(post.userID === req.body.userID){
        await postModel.findByIdAndDelete({_id:postID}, req.body);
        res.status(200).json({msg:"post updated"});
      }
      else{
        res.status(200).json({msg:"you are not authorized"});
      }
      
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });

module.exports={
    postRouter
}