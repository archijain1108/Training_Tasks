import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice ({
    name : "category",

    initialState : {
        allCategories : [],
        subcategories: []
        
    },

    reducers : {
        setCategories : (state , action) => {
            state.allCategories = action.payload
        },

        setSubcategories : (state , action) => {
            state.subcategories = action.payload
        },
        addCategory : (state , action ) => {
            state.allCategories.push(action.payload)
        }

    }
})


export const {setCategories , setSubcategories} = categorySlice.actions
export default categorySlice.reducer