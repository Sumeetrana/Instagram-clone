const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const requireLogin = require("../middleware/requireLogin");

router.post("/createpost", requireLogin, async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    req.user.password = undefined;
    const post = new Post({
      title,
      body,
      postedBy: req.user,
    });
    const result = await post.save();
    res.json({ result });
  } catch (e) {
    console.log("Error: ", e);
  }
});

module.exports = router;
