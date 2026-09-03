import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getAllTasks , createTask , getTaskById ,updateTask , deleteTask } from '../controllers/task.controllers.js';
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
 * @body title, description, status, priority, dueDate
 */
router.post('/' , authMiddleware, validate(createTaskSchema), createTask);


/**
 * @route GET /api/tasks/:id
 * @access protected
 */
router.get('/:id' , authMiddleware, getTaskById);


/**
 * @route PUT /api/tasks/:id
 * @access protected
 * @body title, description, status, priority, dueDate
 */
router.put('/:id' , authMiddleware, validate(updateTaskSchema), updateTask);



/**
 * @route DELETE /api/tasks/:id 
 * @access protected
 */
router.delete('/:id' , authMiddleware, deleteTask);








export default router;

