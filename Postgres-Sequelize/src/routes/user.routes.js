import express from 'express'
import {createUser , getUserById , getAllUsers , updateUserById , deleteUserById}  from '../controllers/user.controller.js'
import {validateUserInput} from '../validators/user.validation.js'

const Router = express.Router()


/**
 * @route POST /api/users
 */
Router.post('/' , validateUserInput , createUser);

/**
 * @route GET /api/users/:id
 */
Router.get('/:id' , getUserById)


/**
 * @route GET /api/users
 */

Router.get('/' , getAllUsers)


/**
 * @route UPDATE /api/users/:id
 * @desp update by id
 */
Router.put('/:id' , updateUserById);

/**
 * @route DELETE /api/users/:id
 * @desp delete user by id
 */
Router.delete('/:id' , deleteUserById)


export default Router;