import jwt  from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.json({
        message: "All fields are mandatory",
        success: false,
      });
    }

    const checkexistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkexistingUser) {
      return res.json({
        message: "User is already exist with this email or username",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    if (newUser) {
      return res.json({
        success: true,
        message: "User register successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "User register failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {

const SECRET_KEY = "adfasdfadfsfa"


  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        message: "All fields are mandatory",
        success: false,
      });
    }

    const checkIfuserExist = await User.findOne({ email });
    if (!checkIfuserExist) {
      return res.json({
        success: false,
        message: "User not found, please register",
      });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      checkIfuserExist.password
    );
    if (!verifyPassword) {
      return res.json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        userId: checkIfuserExist._id,
        username: checkIfuserExist.username,
        role: checkIfuserExist.role,
      },
      SECRET_KEY,
      {
        expiresIn:"15m",
      }
    );

    if(!token){
        res.json({message:'Error generating token'})
    }


    return res.json({
      success: true,
      message: "User login successfully",
      token:token
    });
  } catch (error) {
    console.log(error);
  }
};
