const mongoose = require("mongoose");
const { Schema } = mongoose;

const OTPSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("otp", OTPSchema);
