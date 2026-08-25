import { register , login , logout , getMe } from "../services/auth.api"
import { useDispatch } from "react-redux"
import { setUser } from "../state/auth.slice"

export const useAuth = () => {

    const dispatch = useDispatch()


    const handleRegister = async ({fullname , email , password , contact , role}) => {
      try{
          const data = await register ({fullname , email , password , contact , role })
          dispatch(setUser(data.user))

          return {
            success : true,
            message : data.message 
          }

      }
      catch(err){
         return {
            success : false ,
            message  : err?.response?.data?.message  || "something went wrong"
         }
      }
    }

    const handleLogin = async ({email , password}) => {
       try{
        const data = await login({email , password})
        dispatch(setUser(data.user))
        return {
            message : data.message,
            success : true 
        }
       }
       catch(err){
        return {
            success : false ,
            message : err?.response?.data?.message
        }
       }
    }


    const handleLogout = async () => {
       try{
         const data = await logout()
        dispatch(setUser(null))

        return {
            success : true,
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

    const handleGetMe = async () => {
        try{
            const data = await getMe()
            dispatch(setUser(data.user))

            return {
                success : true ,
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




    return {
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetMe
    }
}