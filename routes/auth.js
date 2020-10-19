const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(422).json({ error: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ message: "Saved succesfully" });
  } catch (e) {
    console.log("Error: ", e);
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
    res.json({ message: "Successfully signed in" });
  } catch (error) {
    console.log("Error: ", error);
  }
});

module.exports = router;
