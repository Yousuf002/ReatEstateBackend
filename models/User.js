// A feature on the website to check file verification, anyone can check by entering security code(Note code) and can verify the file
// Registration code
// Security code
// Name
// Mobile Number
//make mongoose schema for above
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", userSchema);
