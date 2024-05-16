const express = require('express');
const bodyParser = require('body-parser');
//require formDatamodel
const formDatamodel = require('../models/Form');
const router = express.Router();

router.post('/add-form-data', async (req, res) => {
    try {
      // Extract form data from the request body
      const formData = req.body;
  
      // Create a new document with the form data
      const newFormData = new formDatamodel(formData);
  
      // Save the new document to the database
      await newFormData.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
      console.error('Error saving form data:', error);
      // Respond with error message
      res.status(500).json({ error: 'An error occurred while saving form data' });
    }
  });
  router.get('/get-form-data', async (req, res) => {
    try {
      // Fetch form data from your database or any other source
      // For example:
      const formData = await formDatamodel.findOne({ /* Add any conditions */ });
      res.status(200).json(formData);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch form data', error: error.message });
    }
  });
  //export router
  module.exports = router;