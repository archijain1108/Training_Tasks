import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js';
import { createCategory , createSubCategory , deleteSubcategory } from '../controllers/category.controller.js';


const Router = express.Router()



/**
 * @route POST  'api/category/
 * @desp create category 
 * @access private admin
 */

Router.post('/' , authMiddleware('admin') , createCategory)




/**
 * @route POST  'api/category/:categoryId
 * @desp create category 
 * @access private admin
 * @param - categoryId
 * @body - name 
 */

Router.post('/:categoryId/subcategory' , authMiddleware('admin') , createSubCategory)


/**
 * @route DELETE '/api/category/subcategory/:subcategoryId
 */
Router.delete('/subcategory/:subcategoryId' , authMiddleware('admin') , deleteSubcategory)


export default Router ;