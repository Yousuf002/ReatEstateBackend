const Project = require('../models/Project.js');
const addProject = async (req, res) => {
    try {
      const newProject = new Project(req.body);
      const savedProject = await newProject.save();
      res.status(201).json(savedProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  