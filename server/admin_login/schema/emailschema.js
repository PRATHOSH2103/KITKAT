const mongoose = require("mongoose");

const forgotEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        
    }
});

module.exports = mongoose.model("Forgot-email", forgotEmailSchema);