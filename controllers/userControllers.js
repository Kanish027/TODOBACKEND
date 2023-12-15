import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const home = (req, res) => {
  res.status(200).json({
    success: true,
    message: "It's working",
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "Email already registered",
      });
    }
    // Hashing Password Using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 100,
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      })
      .json({
        success: true,
        message: "Registered Successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Registered",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "Wrong Password",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 100,
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      })
      .json({
        success: true,
        message: `Welcome ${user.name}`,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const userProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

const logout = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
};

export { register, login, userProfile, logout, home };
