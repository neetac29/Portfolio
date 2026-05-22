const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      unique: true,
    },
    
    ipAddress: {
      type: String,
      required: true,
    },

    browser: {
      type: String,
      default: "Unknown Browser",
    },

    page: {
      type: String,
      default: "/",
    },

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