const mongoose = require("mongoose");

const forgotPassSchema = new mongoose.Schema({
    newpassword: {
        type: String,
        required: true,
        unique: true,
    },
    confirmpassword: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model("Forgot-Pass", forgotPassSchema);