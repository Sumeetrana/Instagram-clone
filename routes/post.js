const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const requireLogin = require("../middleware/requireLogin");

router.get("/allposts", requireLogin, async (req, res) => {
  try {
    const posts = await Post.find().populate("postedBy", "_id name");
    res.json({ posts });
  } catch (e) {
    console.log("Error: ", e);
  }
});

router.post("/createpost", requireLogin, async (req, res) => {
  const { title, body, picUrl } = req.body;
  if (!title || !body || !picUrl) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    req.user.password = undefined;
    const post = new Post({
      title,
      body,
      photo: picUrl,
      postedBy: req.user,
    });
    const result = await post.save();
    res.json({ result });
  } catch (e) {
    console.log("Error: ", e);
  }
});

router.get("/myposts", requireLogin, async (req, res) => {
  try {
    const myposts = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id name"
    );
    res.json({ myposts });
  } catch (e) {
    console.log("Error: ", e);
  }
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user._id } },
    { new: true }
  )
    .populate("postedBy")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      return res.json(result);
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate("postedBy")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      res.json(result);
    });
});

module.exports = router;
