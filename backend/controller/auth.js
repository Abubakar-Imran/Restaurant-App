import { User } from "../models/user.js";
import ErrorHandler from "../middlewares/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const register_user = async (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;
  let hashPassword;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(password, salt);
    user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashPassword,
    });
    const data = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.status(201).json({
      token,
      success: true,
      message: "User Registered Successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};


export const login_user = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Invalid Email", 401));
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Password", 401));
    }
    const data = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      success: true,
      message: "User Logged In Successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

