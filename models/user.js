const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  username: {
    type: String,
    trim: true,
    required: "Your username"
  },
  password: {
    type:  String,
    trim: true,
    required: "Your password"
  },
  html: {
    type: Boolean
  },
  css: {
    type: Boolean
  },
  javascript: {
    type: Boolean
  },
  react: {
    type: Boolean
  },
  node: {
    type: Boolean
  },
  express: {
    type: Boolean
  },
  mysql: {
    type: Boolean
  },
  mongodb: {
    type: Boolean
  },
  pwa: {
    type: Boolean
  }

// === MAYBE USEFUL IF WE WANT TO ONLY SHOW NEW JOBS LATER ========
//   date: {
//     type: Date,
//     default: Date.now
//   }
//==================================================================
});

const userData = mongoose.model("userData", userSchema);

module.exports = userData;