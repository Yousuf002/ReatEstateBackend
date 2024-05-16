const express = require('express');
const router = express.Router();
const FileVerification = require('../models/FileVerification');
const File = require('../models/File');

// Route to add or update file verification
router.post('/add-file-verification', async (req, res) => {
    const { fileSecurityCode, fileRegistrationCode, mobileNumber, name } = req.body;
  
    if (!fileRegistrationCode) {
      return res.status(400).json({ message: 'Registration code is required' });
    }
  
    try {
      // Check if the registration code exists in the File table
      const fileExists = await File.findOne({ RegistrationCode: fileRegistrationCode });
  
      // Check if the security code matches the registration code
      const securityCodeMatches = fileExists && fileExists.SecurityCode === fileSecurityCode;
  
      // Create a new file verification object
      const fileVerification = new FileVerification({
        fileSecurityCode,
        fileRegistrationCode,
        mobileNumber,
        name,
        status: securityCodeMatches ? 'Verified' : 'Not Verified' // Set status based on security code match
      });
  
      // Save the file verification to the database
      await fileVerification.save();
  
      // Send a response indicating the file verification is saved
      res.status(200).json({
        message: 'File verification saved successfully',
        fileVerification
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

// Route to get all file verifications
router.get('/file-verifications', async (req, res) => {
  try {
    const fileVerifications = await FileVerification.find({});
    res.status(200).json(fileVerifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});
router.put('/edit-file-verification/:id', async (req, res) => {
    const { id } = req.params;
    const { fileSecurityCode, fileRegistrationCode, mobileNumber, name } = req.body;
  
    try {
      // Find the file verification by ID
      let fileVerification = await FileVerification.findById(id);
  
      if (!fileVerification) {
        return res.status(404).json({ message: 'File verification not found' });
      }
  
      // Update the fields
      fileVerification.fileSecurityCode = fileSecurityCode;
      fileVerification.fileRegistrationCode = fileRegistrationCode;
      fileVerification.mobileNumber = mobileNumber;
      fileVerification.name = name;
  
      // Check if the registration code exists in the File collection
      const file = await File.findOne({ RegistrationCode: fileRegistrationCode });
  
      if (file) {
        // If the registration code exists, update the status to Verified
        fileVerification.status = 'Verified';
      } else {
        // Otherwise, set the status to Not Verified
        fileVerification.status = 'Not Verified';
      }
  
      // Save the updated file verification to the database
      await fileVerification.save();
  
      // Send a response indicating the file verification is updated
      res.status(200).json({
        message: 'File verification updated successfully',
        fileVerification
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

  router.delete('/delete-file-verification/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the file verification by ID and delete it
      const deletedFileVerification = await FileVerification.findByIdAndDelete(id);
  
      if (!deletedFileVerification) {
        return res.status(404).json({ message: 'File verification not found' });
      }
  
      // Send a response indicating the file verification is deleted
      res.status(200).json({
        message: 'File verification deleted successfully',
        deletedFileVerification
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
module.exports = router;
