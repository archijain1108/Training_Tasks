import * as Yup from 'yup'


const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .min(3, 'lastName must be at least of 3 character')
    .required('Required'),

  lastName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .min(3, 'lastName must be at least of 3 character')
    .required('Required'),

  email: Yup.string().email('Invalid email address').required('Email required'),


  password : Yup.string()
  .min(4 , 'password must be at least 4 letter')
  .max(8 , 'password must be max 8')
  .required('Password is required')
  .matches(/[A-Z]/, "Must contain an uppercase letter")
  .matches(/[a-z]/, "Must contain a lowercase letter")
  .matches(/[0-9]/, "Must contain a number")
  .matches(/[!@#$%^&*]/, "Must contain a special character"),


  confirmPassword : Yup.string()
  .required('password is required')
  .oneOf(
    [Yup.ref('password')],
    'passwords must match'
  )






})



export default validationSchema
