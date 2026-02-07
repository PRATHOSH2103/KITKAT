const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    date: Date,
    name: String,
    qualification: String,
    yearOfPassing: String,
    phoneNumber: String,
    location: String,
    followUpStatus: String,
    detailsSent: String,
    assignedTo: String,
    course: String,
    source: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
