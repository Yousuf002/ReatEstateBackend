const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fileVerification = new Schema({
  fileSecurityCode: {
    type: String,
    required: true,
  },
  fileRegistrationCode: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Verified', 'Not Verified'],
    required: true,
    default: 'Not Verified'
  }
});

//export schema
module.exports = mongoose.model('fileVerification', fileVerification);