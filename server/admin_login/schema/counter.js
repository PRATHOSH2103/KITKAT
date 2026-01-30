const mongoose = require("mongoose");

const studentCounterSchema = new mongoose.Schema({
  lastNumber: { type: Number, default: 0 }
});

module.exports = mongoose.model("StudentCounter", studentCounterSchema);
