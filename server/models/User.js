const mongoose = require("mongoose");
const { Schema } = mongoose;
const AppSchema = require("./App");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  apps: {
    type: [AppSchema],
    default: [],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
