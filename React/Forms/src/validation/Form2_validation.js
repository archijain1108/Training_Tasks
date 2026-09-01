import * as Yup from 'yup'

const registerSchema = Yup.object({
    firstName: Yup.string()
        .min('3', 'at least 3 character required')
        .max('8', 'At most 10 character allowed')
        .required('Required'),

    lastName: Yup.string()
        .required('Requied')
        .min('3', 'at least 3 character required')
        .max('8', 'At most 10 character allowed'),


    age: Yup.number().positive().integer().required('Required'),

    email: Yup.string().email('Invalid email').required('Required'),

    password: Yup.string().min(3, 'Must be at least 3 character long')
        .max(6, 'At most 6 character long')
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/[0-9]/, "Must contain a number")
        .matches(/[!@#$%^&*]/, "Must contain a special character")


})

export default registerSchema