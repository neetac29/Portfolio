const userSchema = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new userSchema({
      name,
      email,
      password: passwordHash,
    });

    await newUser.save();

    res.status(201).json({ msg: "Registration successful!" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect password!" });
    }

    const payload = {
      id: user._id,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
};

// Verify user token
exports.verifytoken = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, verifiedUser) => {
      if (err) {
        return res.status(401).json({ msg: "Token is invalid or expired" });
      }

      const user = await userSchema.findById(verifiedUser.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      return res
        .status(200)
        .json({
          msg: "Token verified",
          user: { id: user._id, name: user.name },
        });
    });
  } catch (err) {
    console.error("Token Verify Error:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
};
