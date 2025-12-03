const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Get tasks for a specific project
// @route   GET /api/projects/:projectId/tasks
// @access  Private
exports.getTasks = async (req, res) => {
    try {
        // 1. Check if project exists and belongs to user
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // 2. Find tasks where project matches the ID in the URL
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a task
// @route   POST /api/projects/:projectId/tasks
// @access  Private
exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const projectId = req.params.projectId;

        // 1. Verify Project Ownership
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to add tasks to this project' });
        }

        // 2. Create Task
        const task = await Task.create({
            title,
            description,
            status,
            project: projectId
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};