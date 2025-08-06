const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    about: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("About", aboutSchema);
