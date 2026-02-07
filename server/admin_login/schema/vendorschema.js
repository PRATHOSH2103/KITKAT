const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
      trim: true
    },

    vendorType: {
      type: String,
      enum: ["Supplier", "Service", "Contractor"],
      required: true
    },

    mobileNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please enter a valid mobile number"]
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },

    address: {
      type: String,
      required: true
    },

    currentBalance: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },

    paidAmount: {
      type: Number,
      min: 0,
      default: 0
    },

    remainingAmount: {
      type: Number,
      min: 0,
      default: function () {
        return this.currentBalance - this.paidAmount;
      }
    },

    comment: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
