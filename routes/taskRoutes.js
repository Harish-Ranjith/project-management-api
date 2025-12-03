const express = require('express');
// mergeParams is crucial here to access :projectId from parent route
const router = express.Router({ mergeParams: true });
const { getTasks, createTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All routes here are protected
router.use(protect);

router.route('/')
    .get(getTasks)
    .post(createTask);

module.exports = router;