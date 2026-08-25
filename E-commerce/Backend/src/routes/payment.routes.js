import express from'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { createPayment , verifyPayment } from '../controllers/payment.controller.js'


const Router = express.Router()

/**
 * @route 'api/payment/
 * @access private buyer
 * @desp call when user click on checkout
 */

Router.post('/' , authMiddleware('buyer') , createPayment)


/**
 * @route 'api/payment/verify/
 * @access private buyer
 */

Router.post('/verify',  authMiddleware('buyer') , verifyPayment )






export default Router