import express from 'express'
import {registerUser , loginUser , getUser} from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import validate from '../middlewares/validate.middleware.js';
import {validateUserRegister , validateUserLogin} from '../validators/auth.validator.js';


const authRouter = express.Router();



/*
 route : /api/auth/register
 method : POST'
 body : {username , password , email}
*/
authRouter.post('/register' , validate(validateUserRegister) , registerUser )

/**
 * route : /api/auth/login
 * method : POST
 * body : {email , password}
 */

authRouter.post('/login' , validate(validateUserLogin), loginUser)

/**
 * route : '/api/auth/getUser
 * method : GET
 */

authRouter.get('/getuser'  , authMiddleware , getUser)



export default authRouter

