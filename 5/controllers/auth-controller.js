/** @type {import("mongoose").Model} */
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

//register controller
const registerUser = async (req, res) => {
  try {
    //extract user information from our request body
    const { username, email, password, role } = req.body;

    //check if the user already exist in our database
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    }); // this or check either the username or email already exists
    if (checkExistingUser) {
      res.status(400).json({
        success: false,
        message:
          "User already exists either with same username or same email. Please try with a different username or email",
      });
    }

    //hash user password
    const salt = await bcryptjs.genSalt(10);
    const hasehedPassword = await bcryptjs.hash(password, salt); //string to be used in hash() is user input password

    //creating a new user and save in our database
    const newlyCreatedUser = new User({
      username,
      email,
      password: hasehedPassword,
      role: role || "user",
    });

    await newlyCreatedUser.save();

    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: "User registered successfully!",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register user! Please try again.",
      });
    }
  } catch (e) {
    console.log("Error => ", e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

//login controller
const loginUser = async (req, res) => {
  try {
  } catch (e) {
    console.log("Error => ", e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
