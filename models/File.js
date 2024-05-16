const mongoose = require('mongoose');
const Form = require('./Form'); // Import the form schema

const fileSchema = new mongoose.Schema({
  RegistrationCode: {
    type: String,
    required: true,
    unique: true
  },
  SecurityCode: {
    type: String,
    required: true
  },
  PlotType: {
    type: String,
    enum: ['Residential', 'Commercial', 'Farmhouse'],
    required: true
  },
  PlotSize: {
    type: String,
    enum: ['5 Marla', '10 Marla', '1 Kanal'],
    required: true
  },
  Project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  FileStatus: {
    type: String,
    enum: ['Open', 'In Process', 'Closed'],
    required: true,
    default: 'Open'
  },
  // Reference to form schema
  FormData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form'
  }
});

const File = mongoose.model('FileObject', fileSchema);

module.exports = File;
