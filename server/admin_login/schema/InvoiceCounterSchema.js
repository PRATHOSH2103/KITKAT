const mongoose = require("mongoose");

const customerInvoiceCounterSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
    unique: true
  },
  lastNumber: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model(
  "CustomerInvoiceCounter",
  customerInvoiceCounterSchema
);
