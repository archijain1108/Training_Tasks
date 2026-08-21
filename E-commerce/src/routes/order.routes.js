import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'

const Router = express.Router()


/**
 * @route POST '/api/order/'
 * @description create order by fetching user cart after payment
 */

Router.post('/' , authMiddleware('buyer') , createOrder)


/**
 * @route GET '/api/order/
 * @description get all orders with status - pending , delivered, confirmed  
 * token  buyerid
 */
Router.get('/' ,  authMiddleware('buyer') , getBuyerOrders)




/**
 * @route GET '/api/order/seller/:sellerId
 * @description get all order to show on seller dashboard
 */
Router.get('/seller/:sellerId' , authMiddleware('seller') , getSellerOrders)





export default Router