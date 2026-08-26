import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice ({
    name : 'usercart', 
    intialState: {
        cart : null ,
        loading : false 
    },
    reducers : {
        setLoading : (state , action) => {
            state.loading = action.payload
        },
        setCart : (state ,action) => {
            state.cart = action.payload
        },

        addItem : (state , action) => {
            state.cart.items = state.cart.items.push(action.payload)
        },

        removeCartItem : (state , action) => {
            state.cart.items = state.cart.items.filter((e) =>  {
                return e.id !== action.payload
            })
        }

    }
})


export const {setLoading , setCart , addItem , removeItem} = cartSlice.actions
export default cartSlice.reducer