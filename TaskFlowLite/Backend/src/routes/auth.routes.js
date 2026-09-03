import express from 'express'
import { registerUser , loginUser , logoutUser } from '../controllers/auth.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import validate from '../middlewares/validate.js'
import { registerSchema , loginSchema } from '../validators/auth.schema.js'

const router = express.Router()

/**
 * @route /api/auth/register
 * @body email password username
 * @access public
 */

router.post('/register' , validate(registerSchema) , registerUser)

/**
 * @route /api/auth/login
 * @body email password
 * @access public
 */

router.post('/login' , validate(loginSchema) , loginUser)


/**
 * @route /api/auth/logout
 * @access protected
 */
router.post('/logout' , authMiddleware , logoutUser)


export default Router