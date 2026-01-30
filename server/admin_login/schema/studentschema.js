const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true,immutable: true },

    firstName: String,
    lastName: String,
    fatherName: String,
    motherName: String,

    dob: Date,
    email: String,

    address: String,
    contactNumber: String,
    alternateNumber: String,

    gender: String,
    maritalStatus: String,
    qualification: String,
    workExperience: Number,

    course: String,
    totalAmount: Number,
    remainingAmount: Number,

    mentor: String,
    dateOfJoining: Date,

    studentStatus: {
      type: String,
      enum: ["Active", "Pending", "Inactive", "Completed"]
    },

    photoPath: String,
    remarks: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);


