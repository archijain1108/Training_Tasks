import React from 'react'
import {useForm} from 'react-hook-form'
import registerSchema from './validation/Form2_validation'
import {yupResolver} from '@hookform/resolvers/yup'

const Form2 = () => {
  const {
    register , 
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver : yupResolver(registerSchema)
  })

   const onSubmit = (data) => {
    console.log('data' ,  data)
  }

 

  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="text" placeholder='First Name' {...register("firstName")} />
        <p>{errors.firstName?.message}</p>

        <input type="text" placeholder='Last Name' {...register("lastName")} />
        <p>{errors.lastName?.message}</p>

        <input type="email" placeholder='Enter email' {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="number" placeholder='Enter age' {...register("age")} />
        <p>{errors.age?.message}</p>

        <input type="password" placeholder='Enter password' {...register("password")} />
        <p>{errors.password?.message}</p>



        <button type="submit" >Submit</button>


      </form>
      
    </div>
  )
}

export default Form2
