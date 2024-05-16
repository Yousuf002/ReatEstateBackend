const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.post('/addProject', async (req, res) => {
    try {
        const { name, location, description } = req.body;

        // Create a new project
        const newProject = new Project({
            name,
            location,
            description
        });

        // Save the project to the database
        await newProject.save();

        res.status(201).json({ message: 'Project registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/delete/:projectId', async (req, res) => {
    try {
        console.log("hello");
        console.log('Deleting project with ID:', req.params.projectId);
        const project = await Project.findByIdAndDelete(req.params.projectId);
        if (!project) {
            console.log('Project not found');
            return res.status(404).json({ error: 'Project not found' });
        }
        console.log('Project deleted successfully:', project);
        res.status(200).json(project);
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/edit/:projectId', async (req, res) => {
    try {
        const { name, location, description } = req.body;
        const projectId = req.params.projectId;

        // Find the project by ID
        let project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update project details if provided in the request body
        if (name) {
            project.name = name;
        }
        if (location) {
            project.location = location;
        }
        if (description) {
            project.description = description;
        }

        // Save the updated project to the database
        await project.save();

        res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        // Find all projects
        const projects = await Project.find();

        // Return projects
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects man:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getproject/:projectId', async (req, res) => {
    try {
        // Get the project ID from the request parameters
        const projectId = req.params.projectId;

        // Find the project by ID
        const project = await Project.findById(projectId);

        // Check if project exists
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Return the project
        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





module.exports = router;
