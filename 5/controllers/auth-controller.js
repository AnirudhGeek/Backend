/** @type {import("mongoose").Model} */
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");

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
    const salt = await bcryptjs.genSalt(10); //Generates a salt, which is a random string added to the password before hashing.10 is the number of rounds (more rounds = more secure but slower).This prevents attackers from using precomputed hash tables (like rainbow tables).
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
    //extracting our username
    const { username, password } = req.body;

    //checking whether this username does exist in our database or not
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User doen't exist",
      });
    }

    //checking if the password is correct or not
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid creadentials",
      });
    }

    //create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m", // this tells this token is valid for 15 minutes
      }
    );

    res.status(200).json({
      success: true,
      message: "Logged in Successful",
      accessToken,
    });
  } catch (e) {
    console.log("Error => ", e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

//changing password functionality
const changePassword = async (req, res) => {
  try {
    //first we need to get the user id and that we can get from authentication middleware
    const userId = req.userInfo.userId;

    //extract old and new password
    const { oldPassword, newPassword } = req.body;

    //find the current logged in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        successs: false,
        message: "User not found.",
      });
    }

    //check if the old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Old password is not correct please add a valid password.",
      });
    }

    //hash the new password here
    const salt =await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    //update user password
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
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
  changePassword,
};
