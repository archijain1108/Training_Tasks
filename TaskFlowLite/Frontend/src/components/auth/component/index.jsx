import React , {useEffect} from 'react'
import Form from './form'
import {useContext} from 'react'
import {AuthContext} from '../../../store/AuthContext'
import { useNavigate } from 'react-router-dom'


const auth = ({mode}) => {
   const user = useContext(AuthContext)
   const navigate = useNavigate()
    

   useEffect(() => {
     if(user.user){
        navigate('/')
        console.log( 'from auth' , user)
     }
   })
   


  return (
    <div>
    
      <Form mode={mode} />
        
      
    </div>
  )
}

export default auth
