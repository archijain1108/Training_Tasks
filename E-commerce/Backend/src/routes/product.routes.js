import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { createProduct , addVariant , deleteProduct , deleteVariant , editProduct , getAllProducts , getProductDetails } from '../controllers/product.controller.js';
import validate from '../middlewares/validate.js';
import { productSchema , variantSchema } from '../validators/product.schema.js';

import { upload , multerErrorHandler } from '../services/multer.service.js';

import formatData from '../utils/formatProductData.js';


const Router = express.Router();


/**
 * @route POST '/api/product/:subcategoryId
 * @body {category , title , desp , price ,  variants , images }
 * @access private (seller)
 */

Router.post('/:subcategoryId' ,
     authMiddleware('seller') , 
     upload.any(),
     multerErrorHandler,
     formatData,
     validate(productSchema),
     createProduct                
    );



/**
 * @route POST '/api/product/:id/variant
 * @access private (seller)
 */

Router.post('/:id/variant' , 
    authMiddleware('seller') , 
    upload.any(),
    multerErrorHandler,
    formatData,
    validate(variantSchema) , 
    addVariant

)

/**
 * @route DELETE '/api/product/:id
 * @params id
 * @access private (seller)
 */

Router.delete('/:id' , authMiddleware('seller') , deleteProduct)

/**
 * @route DELETE '/api/product/variant/:variantId
 * @param - variantId
 * @access private (seller )
 */


Router.delete('/variant/:variantId' , authMiddleware('seller') , deleteVariant)


/**
 * @route '/api/product/:id
 * @params id
 * @body details for update 
 * @access private (seller)
 */
Router.patch('/:id' , 
    authMiddleware('seller'), 
    validate(productSchema) , 
    editProduct
)


/**
 * @route GET '/api/product
 * @access public
 */
Router.get('/' , getAllProducts)


/**
 * @route GET '/api/product/:id
 * @params id
 * @access public
 */

Router.get('/:id' , getProductDetails);





export default Router