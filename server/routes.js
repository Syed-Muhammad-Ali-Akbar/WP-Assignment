const express = require('express');
const router = express.Router();
const User = require('./models/user');
const bcrypt = require('bcryptjs');


// Register route
router.post('/register', async (req, res) => {
  const { username, fullName, contact, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ error: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, fullName, contact, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
