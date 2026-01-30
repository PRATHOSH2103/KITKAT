// import mongoose from "mongoose";

// const customerSchema = new mongoose.Schema(
//   {
//     clientName: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     address: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     contactNumber: {
//       type: String, // keep as String to preserve leading zeros
//       required: true
//     },

//     date: {
//       type: Date,
//       required: true
//     },

//     state: {
//       type: String,
//       required: true
//     },

//     InvoiceNo: {
//       type: String,
//       unique: true
//     },

//     // GSTIN: {
//     //   type: String,
//     //   required: true,
//     //   unique: true,
//     //   uppercase: true
//     // }

    
//     GSTIN: {
//       type: String,
//       required: true,
//       uppercase: true,
//       match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// module.exports = mongoose.model("Customer", customerSchema);




const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  date: { type: Date, required: true },
  state: { type: String, required: true },
  InvoiceNo: { type: String, required: true, unique: true },
  GSTIN: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema); // ✅ MUST be model
