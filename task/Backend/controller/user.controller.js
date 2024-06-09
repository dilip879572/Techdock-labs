const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password ,contact} = req.body;
    if (!email || !password || !contact) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    let user_data = new User(req.body);
    let result = await user_data.save();
    result = result.toObject();

    if (result) {
      let myToken = await user_data.getAuthToken();
      if (myToken) {
        return res.status(201).json({
          result,
          message: "Token Generated Successfully",
          token: myToken,
        });
      } else {
        return res.status(500).json({ message: "Token was not generated" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    return res.status(200).json({
      success: true,
      message: "User Logged in Successfully",
      user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
