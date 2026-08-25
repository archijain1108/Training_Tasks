import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice ({
    name : 'auth',

    initialState : {
        user : null,
        loading : null
    },

    reducers : {

        setUser : (state , action) => {
            state.user = action.payload
        },

        setLoading : (state , action) => {
            state.loading = action.payload
        }

    }
})


export const {setUser , setLoading} = authSlice.actions
export default authSlice.reducer