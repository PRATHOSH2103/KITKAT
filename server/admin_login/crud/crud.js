// const User = require("../schema/schema");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// // const bcrypt = require("bcryptjs");


// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";
// import User from "../schema/schema.js";


const User = require("../schema/schema");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken")

// READ
const getMethodfun = async (req, res) => {
  try {
    if (req.user.role === "admin") {

      let getData = await User.find();
      res.json(getData);
    }
    // let getData = await user.find();
    // res.json(getData);

  } catch (error) {
    res.json(error);
  }
};

// REGISTER
const postMethodfun = async (req, res) => {

  try {
    const hassPass = await bcrypt.hash(req.body.password, 10);
    const createData = new User({
      ...req.body,
      password: hassPass
    });

    let saveData = await createData.save();


    res.json({ msg: "Registered successfully", saveData });
  } catch (error) {
    res.json(error);
  }
};  

// LOGIN
const loginMethod = async (req, res) => {


  try {
    const { name, password } = req.body;

    let user = await User.findOne({ name });

    if (!user) return res.status(400).json({ success: false, msg: "Name not found" });

    let existingpass = await bcrypt.compare(password, user.password);

    if (!existingpass) return res.status(400).json({ success: false, msg: "Password is incorrect" });


    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name
      },
      process.env.SECRETKEY
    );

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });



  } catch (error) {
    res.json(error);
  }


};


//  FORGOT PASSWORD

const forgotPassword = async (req, res) => {
  try {
 const { email } = req.body;
    if (!email)
      return res.status(400).json({ msg: "Email required" });

    const admin = await User.findOne({ email });
    if (!admin)
      return res.status(404).json({ msg: "Admin not found" });


    const resetToken = crypto.randomBytes(32).toString("hex");

    admin.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await admin.save({ validateBeforeSave: false });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      to: admin.email,
      subject: "Admin Password Reset",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Link expires in 15 minutes</p>
      `
    });

    res.json({ msg: "Reset link sent to email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};




 // RESET PASSWORD

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const admin = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!admin) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    admin.password = await bcrypt.hash(password, 10);
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save();

    res.json({ msg: "Password reset successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


//  VERIFY TOKEN

const verifyToken = async (req, res, next) => {


  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  // console.log(token);

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.user = decoded;
    next();
  });


};


module.exports = {
    getMethodfun,
    postMethodfun,
    loginMethod,
    forgotPassword,
    resetPassword,
    verifyToken

};


// export {
//   getMethodfun,
//   loginMethod,
//   forgotPassword,
//   resetPassword,
//   verifyToken,
//   postMethodfun
// };












