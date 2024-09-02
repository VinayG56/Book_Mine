const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
// Sign up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }
    const existUsername = await User.findOne({ username: username });
    if (existUsername) {
      return res.status(400).json({ message: "Username exists" });
    }
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      return res.status(400).json({ message: "Email exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password's length should be greater than 5" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "Signup Successfull" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//Sign in
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.findOne({ username });
    if (!existUser) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    await bcrypt.compare(password, existUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existUser.username },
          { role: existUser.role },
        ];
        const token = jwt.sign({ authClaims }, "bookmine07", {
          expiresIn: "90d",
        });
        res.status(200).json({
          message: "Signin Successfull",
          id: existUser._id,
          role: existUser.role,
          token: token,
        });
      } else {
        res.status(400).json({ message: "Wrong Password" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//get user info
router.get("/get-user-info", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
