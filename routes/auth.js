const express = require("express");
const router = express.Router();
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

  try {
    const newUser = new User({
      email,
      name,
      password,
    });
    await newUser.save();
    res.json({ message: "Saved succesfully" });
  } catch (e) {
    console.log("Error: ", e);
  }
});

module.exports = router;
