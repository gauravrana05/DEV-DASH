const mongoose = require("mongoose");

const providerEnum = [
  "React",
  "Tailwind",
  "Express",
  "MongoDB",
  "Django",
  "Angular",
  "Firebase",
  "Azure",
  "AWS",
  "NodeJS",
];

const AppSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    providers: {
      type: [String],
      enum: {
        values: providerEnum,
        message: "{VALUE} is not a supported provider",
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("App", AppSchema);
