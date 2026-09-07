import * as yup from 'yup'


export const registerSchema = yup.object({
    username : yup.string().required('Username is required').min(3).max(20),
    email : yup.string().required('Email is required').email(),
    password : yup.string().required('Password is required')
   .min(4, "Password must be at least 4 characters")
   .max(8, "Password must be at most 8 characters"),

})


export const loginSchema = yup.object({
    email : yup.string().required('Email is required').email(),
    password : yup.string().required('Password is required')
})