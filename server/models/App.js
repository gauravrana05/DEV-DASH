const mongoose = require("mongoose");
const { Schema } = mongoose;

const providerEnum = [
  "Google",
  "Facebook",
  "Binance",
  "Twitter",
  "Instagram",
  "Spotify",
  "Quora",
  "Tinder",
  "Bumble",
  "Bybit",
];

const AppSchema = new Schema({
  appName: {
    type: String,
    required: true,
  },
  providers: {
    type: [String],
    enum: {
      values: providerEnum,
      message: "{VALUE} is not a supported provider",
    },
    required: true,
  },
});

module.exports = AppSchema;
