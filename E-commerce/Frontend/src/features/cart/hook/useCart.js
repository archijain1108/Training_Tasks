import { getCart, addToCart, increaseQuantity, decreaseQuantity, removeItem } from "../services/cart.api.js";


import { setLoading, setCart, addItem, removeCartItem } from "../state/cart.slice.js";

import { useDispatch } from "react-redux";


export const useCart = () => {
    const dispatch = useDispatch()



    const handleGetCart = async () => {

        try {
            dispatch(setLoading(true))
            const data = await getCart();
            dispatch(setCart(data.cart))

            return {
                success: true,
                message: data.message
            }
        }
        catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message || "something went wrong"
            }
        }
        finally {
            dispatch(setLoading(false))
        }

    }


    const handleAddToCart = async ({productId , variantId , quantity}) => {
        try {
            dispatch(setLoading(true))
            const data = await addToCart ({productId , variantId , quantity})
            dispatch(addItem(data.cartItem));

            return {
                success : true ,
                message : data.message
            }

        }
        catch(err){
            return {
                success : true ,
                message : err?.response?.data?.message
            }
        }
        finally {
            dispatch(setLoading(false))
        }
    }


    const handleIncreaseQuantity = async (itemId) => {
        try{
            const data = await increaseQuantity({itemId})
            return {
                success: true ,
                message : data.message 
            }
        }
        catch(err){
            return {
                success : false ,
                message : err?.response?.data?.message

            }
        }
    } 
        const handledecreaseQuantity = async (itemId) => {
        try{
            const data = await decreaseQuantity({itemId})
            return {
                success: true ,
                message : data.message 
            }
        }
        catch(err){
            return {
                success : false ,
                message : err?.response?.data?.message

            }
        }
    } 


    const handleRemoveItem = async (itemId) => {
        try{
            dispatch(setLoading(true))
            const data = await removeItem({itemId})
            dispatch(removeCartItem(itemId))
            return {
                success : true ,
                message : data.message 
            }
        }
        catch(err){
            return {
                success : true,
                message : err?.response?.data?.message
            }
        }
        finally {
            dispatch(setLoading(false ))
        }
    }









    return {
        handleGetCart,
        handleAddToCart,
        handleIncreaseQuantity,
        handledecreaseQuantity,
        handleRemoveItem
    }


}