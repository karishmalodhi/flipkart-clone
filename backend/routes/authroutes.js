const express = require("express");
const router = express.Router();

const User = require("../models/User");


// =======================
// SIGNUP API
// =======================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    // create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({
      success: true,
      message: "Signup successful"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// =======================
// LOGIN API
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;