const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    createProject,
    getProjectById,
    deleteProject,
    updateProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Include other resource routers 
const taskRouter = require('./taskRoutes');

// Re-route into other resource routers
// Any request ending in /tasks will be sent to the taskRouter
router.use('/:projectId/tasks', taskRouter);

// Applying protection to all routes in this file
router.use(protect);

router.route('/')
    .get(getAllProjects)
    .post(createProject);

router.route('/:id')
    .get(getProjectById)
    .delete(deleteProject)
    .put(updateProject);

module.exports = router;