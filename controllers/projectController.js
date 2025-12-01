const Project = require('../models/Project');

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new project
exports.createProject = async (req, res) => {
    try {
        // Basic validation
        if (!req.body.name) return res.status(400).json({ error: "Name is required" });

        // Create and save to DB
        const newProject = await Project.create(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};