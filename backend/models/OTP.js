const mongoose = require("mongoose");
const { Schema } = mongoose;

const typeEnum = ["register", "resetPassword"];

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
    type: {
      type: String,
      required: true,
      enum: typeEnum,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("otp", OTPSchema);
