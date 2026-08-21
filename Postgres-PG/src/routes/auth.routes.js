import express from 'express';
import { createUser, deleteUser, getAllUser, getUserById, updateUser } from '../controllers/user.controller.js';

const router = express.Router()


/**
 * @route POST  /api/auth/user
 * @access public
 */
router.post('/user' , createUser);


/**
 * @route GET /api/auth/user
 * @access public
 */

router.get('/user', getAllUser)

/**
 * @route GET /api/auth/get-user/:id
 * @desp get user based on id
 */

router.get('/get-user' , getUserById);

/**
 * @route PUT /api/auth/user/:id
 * @access private
 */
router.put('/user/:id' , updateUser)


/**
 * @route DELETE /api/auth/user/:id
 * @access private 
 */
router.delete('/user/:id' , deleteUser);





export default router