const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    browser: String,
    device: String,
    page: String,
    visitCount: {
      type: Number,
      default: 1,
    },
    lastVisitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);