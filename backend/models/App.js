const mongoose = require('mongoose')


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


const AppSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    pvoviders: {
      type: [String],
      enum: {
        values: providerEnum,
        message: "{VALUE} is not a supported provider",
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('App', AppSchema)
