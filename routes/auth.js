const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");

router.get("/protected", requireLogin, (req, res) => {
  res.send("hello");
});

router.post("/signup", async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(422).json({ error: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const newUser = new User({
        email,
        name,
        password: hashedPassword,
        pic,
      });
      await newUser.save();
      res.json({ message: "Saved succesfully" });
    } catch (e) {
      console.log("Error: ", e);
    }
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please provide email and password" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ error: "User doesn't exist" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(422).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        followers: user.followers,
        following: user.following,
        pic: user.pic,
      },
    });
  } catch (error) {
    console.log("Error: ", error);
  }
});

module.exports = router;
