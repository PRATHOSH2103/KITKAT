const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true }
});

const invoiceSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    InvoiceNo: { type: String, required: true },
    GSTIN: { type: String },
    date: { type: Date, required: true },
    items: { type: [itemSchema], required: true },
    subTotal: { type: Number, required: true },
    igst: { type: Number, required: true },
    grandTotal: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
