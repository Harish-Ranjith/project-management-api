const express = require('express');
// mergeParams is crucial here to access :projectId from parent route
const router = express.Router({ mergeParams: true });
const { getTasks, createTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All routes here are protected
router.use(protect);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - project
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: The task title
 *         description:
 *           type: string
 *           description: The task description
 *         status:
 *           type: string
 *           enum: [todo, in-progress, done]
 *           default: todo
 *         project:
 *           type: string
 *           description: The ID of the project this task belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the task was created
 *       example:
 *         title: Implement Login
 *         description: Create the JWT login flow
 *         status: in-progress
 *         project: 64f1a2b3c4d5e6f7g8h9i0j1
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management (Nested under Projects)
 */

/**
 * @swagger
 * /api/projects/{projectId}/tasks:
 *   get:
 *     summary: Get all tasks for a specific project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to fetch tasks from
 *     responses:
 *       200:
 *         description: List of tasks for the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new task within a project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to add the task to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, done]
 *             example:
 *               title: Setup Docker
 *               description: Create Dockerfile and compose
 *               status: todo
 *     responses:
 *       201:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.route('/')
    .get(getTasks)
    .post(createTask);

module.exports = router;