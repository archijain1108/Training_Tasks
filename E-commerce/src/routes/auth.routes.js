import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js';
import { registerUser , loginUser , logoutUser , getMe } from '../controllers/auth.controller.js';
import {registerSchema , loginSchema} from '../validators/auth.schema.js'
import validate from '../middlewares/validate.js'


const Router = express.Router();

/**
 * @route /api/auth/register
 * @access Public
 * @body fullname, password , email, contact, role
 */

Router.post('/register' ,  validate(registerSchema) , registerUser);


/**
 * @route /api/auth/login
 * @access Public
 * @body email , password
 */

Router.post('/login' , validate(loginSchema) , loginUser);


/**
 * @route /api/auth/get-me
 * @access private
 */

Router.get('/get-me' , authMiddleware , getMe)


/**
 * @route /api/auth/logout
 * @access private
 */

Router.post('/logout' , authMiddleware , logoutUser)






export default Router