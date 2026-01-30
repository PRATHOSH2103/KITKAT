const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    statusWork: String,
    permission: Boolean,
    leave: Boolean,
    inDate: Date,
    outDate: Date,
    inTime: String,
    outTime: String,
    comments: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
