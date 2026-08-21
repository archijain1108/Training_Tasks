import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getCart, addToCart, removeCartItem,
  increaseQuantity, decreaseQuantity,
  clearCart
} from "../controllers/cart.controller.js";

const Router = express.Router();

/**
 * @route '/api/cart/
 * @desp get user cart
 */
Router.get( "/", authMiddleware("buyer"), getCart );



/**
 * @route '/api/cart/:productId/:variantId
 * @desp add product to cart 
 */
Router.post( "/item/:productId/:variantId",  authMiddleware("buyer"), addToCart);


/**
 * @route '/api/cart/item/:itemId/increase
 * @desp  quantity inc by 1 
 */
Router.patch( "/item/:itemId/increase",  authMiddleware("buyer"),  increaseQuantity );


/**
 * @route '/api/cart/item/:itemId/increase
 * @desp  quantity dec by 1 
 */
Router.patch( "/item/:itemId/decrease", authMiddleware("buyer"), decreaseQuantity );


/**
 * @route DELETE '/api/cart/item/:itemId
 * @desp  quantity inc by 1 
 */
Router.delete("/item/:itemId",  authMiddleware("buyer"),  removeCartItem );


/**
 * @route '/api/cart/item/:itemId/increase
 * @desp  clear cart
 */
Router.delete( "/", authMiddleware("buyer"), clearCart );

export default Router;