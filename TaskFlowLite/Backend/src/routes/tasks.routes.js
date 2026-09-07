import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getAllTasks , createTask , getTaskById ,updateTask , deleteTask , updateTaskStatus } from '../controllers/task.controllers.js';
import validate from '../middlewares/validate.js';
import {createTaskSchema , updateTaskSchema} from '../validators/task.schema.js'


const router = express.Router();

/**
 * @route GET /api/tasks
 * @access protected
 */
router.get('/' , authMiddleware, getAllTasks);

/**
 * @route POST /api/tasks
 * @access protected
 * @body title, description, priority, dueDate
 */
router.post('/' , authMiddleware, validate(createTaskSchema), createTask);


/**
 * @route GET /api/tasks/:taskId
 * @access protected
 */
router.get('/:taskId' , authMiddleware, getTaskById);


/**
 * @route PUT /api/tasks/:taskId
 * @access protected
 * @body title, description, status, priority, dueDate
 */
router.patch('/:taskId' , authMiddleware, validate(updateTaskSchema), updateTask);



/**
 * @route DELETE /api/tasks/:taskId 
 * @access protected
 */
router.delete('/:taskId' , authMiddleware, deleteTask);


/**
 * @route PATCH /api/tasks/:taskId/status
 * @access protected
 * @body status
 */
router.patch('/:taskId/status' , authMiddleware, updateTaskStatus);








export default router;

