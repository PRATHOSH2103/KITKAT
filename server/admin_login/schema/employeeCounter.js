const mongoose = require("mongoose");

const EmployeeCounterSchema = new mongoose.Schema({
  lastNumber: { type: Number, default: 0 }
});

module.exports = mongoose.model("EmployeeCounter", EmployeeCounterSchema);
