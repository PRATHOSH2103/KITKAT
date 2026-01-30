const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true
  },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dob: { type: Date, required: true },

  email: { type: String, required: true },
  address: { type: String, required: true },

  contactNumber: { type: String, required: true },
  alternateNumber: { type: String, required: true },

  gender: { type: String, enum: ["Male", "Female", "Others"], required: true },
  maritalStatus: { type: String, enum: ["Married", "Unmarried"], required: true },

  qualification: { type: String, required: true },
  workExperience: { type: Number, required: true },

  designation: { type: String, required: true },
  salary: { type: Number, required: true },
  annualsalary: { type: Number, required: true },

  dateOfJoining: { type: Date, required: true },
  dateOfReliveing: { type: Date},

  isStaff: { type: String, enum: ["Yes", "No"], required: true },
  staffdateOfJoining: { type: Date },

  aadhar: { type: String, required: true },
  panNumber: { type: String, required: true },
  accountnumber: { type: String, required: true },

  employeeType: { type: String, enum: ["Work from home", "On site"], required: true },

  uploadPhoto: { type: String }, 
  remarks: { type: String },

}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
