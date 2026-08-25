import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { getBuyerOrders , getSellerOrders } from '../controllers/order.controller.js'

const Router = express.Router()




/**
 * @route GET '/api/order/
 * @description get all orders with status - pending , delivered, confirmed  
 * @access private buyer
 */
Router.get('/' ,  authMiddleware('buyer') , getBuyerOrders)




/**
 * @route GET '/api/order/seller/dashboard
 * @description get all order to show on seller dashboard
 */
Router.get('/seller/dashboard' , authMiddleware('seller') , getSellerOrders)





export default Router