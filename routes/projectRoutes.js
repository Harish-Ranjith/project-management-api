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

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the project
 *         name:
 *           type: string
 *           description: The project name
 *         description:
 *           type: string
 *           description: The project description
 *         status:
 *           type: string
 *           enum: [active, completed, archived]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the project was added
 *       example:
 *         name: Project Zero
 *         description: Development of the prototype.
 *         status: active
 */

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: The project managing API
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Returns the list of all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: The project was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Missing parameters
 *       401:
 *         description: Unauthorized
 */
router.route('/')
    .get(getAllProjects)
    .post(createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get the project by id
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: The project description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: The project was not found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update the project by the id
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: The project was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: The project was not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Remove the project by id
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: The project was deleted
 *       404:
 *         description: The project was not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .get(getProjectById)
    .delete(deleteProject)
    .put(updateProject);

module.exports = router;