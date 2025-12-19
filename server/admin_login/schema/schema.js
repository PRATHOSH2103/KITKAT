// const mongoose = require("mongoose");

// const User = mongoose.Schema({

//     role: {
//         type: String,
//         default: "admin",
//         enum: ["admin"],
//         lowercase: true,
//         trim: true
//     },

//     name: {

//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {

//         type: String,
//         required: true,
//     },
//     email: {

//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim: true
//     },


//     resetPasswordToken: {
//         type: String,
//     },

//     resetPasswordExpire
//         : {
//         type: Date,
//     },

//     passwordChangedAt: {
//         type: Date,
//     },

// });



// module.exports = mongoose.model("logindata", User);




const mongoose = require("mongoose");

// import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },

        role: {
            type: String,
            enum: ["admin"],
            default: "admin"
        },

        resetPasswordToken: {
            type: String
        },

        resetPasswordExpire: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);


// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// })


module.exports = mongoose.model("User", userSchema);
// export default mongoose.model("User", userSchema);