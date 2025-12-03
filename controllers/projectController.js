const Project = require('../models/Project');

// @desc    Get all projects for the logged-in user
// @route   GET /api/projects
// @access  Private
exports.getAllProjects = async (req, res) => {
    try {
        // FILTER: Only find projects where owner === logged-in user ID
        const projects = await Project.find({ owner: req.user.id });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // SECURITY CHECK: Ensure the logged-in user owns this project
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
    try {
        if (!req.body.name) return res.status(400).json({ error: "Name is required" });

        // ATTACH OWNER: Set the owner field to the logged-in user
        const newProject = await Project.create({
            ...req.body,
            owner: req.user.id
        });

        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: 'Project not found' });

        // SECURITY CHECK
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: 'Project not found' });

        // SECURITY CHECK
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated object
        );
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};