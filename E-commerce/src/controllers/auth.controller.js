import 'dotenv/config'
import db from '../models/index.cjs'
import {Op} from "sequelize"
import jwt from 'jsonwebtoken'



// console.log(Object.keys(db));
// console.log(Op);
// console.log(config.jwt_secret)


const {User} = db;


const createAndSetToken = ( user ) =>{

      const token = jwt.sign(
            {id : user.id , role : user.role},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        )

        res.cookie('token' , token , {
            secure : process.env.NODE_ENV === 'production',
            httpOnly : true,
            maxAge : 24 *60 * 60 *1000,
            sameSite : "strict"
            
        })
}


export const registerUser = async (req , res , err) =>{
     const {fullname , email , password , contact, role} = req.body;

     try{
        
        const userExists = await User.findOne({
            where :{
                [Op.or] : [{email} , {contact}]
            }
        })

        if(userExists) {
            return res.status(403)
            .json({
                message : "User already exists"
            })
        }

        const user = await User.create({
            fullname ,
            password,
            email,
            contact,
            role
        })

        createAndSetToken(user);

         // user without password field returned
        return res.status(200)
        .json({
            message : 'user register successfully',
            user
        })
    
     }catch(err){
        next(err)
     }
}


export const loginUser = async (req , res , next) =>{
    const {email , password} = req.body;

    try{

        const user = await User.findOne({
            where : {email}
        })

        if(!user ){
            return res.status(404)
            .json({
                message : "User not found"
            })
        }

        const isValidPassword = user.comparePassword(password);

        if(! isValidPassword){
            return res.status(401)
            .json({
                message : "User not found"
            })
        }


        createAndSetToken(user)

       // exclude password 
        res.status(200)
        .json({
            message : "user logged in successfully",
            user
        })


    }
    catch(err){
        next(err);
    }
}


/** 
 * @desp protected route 
*/


export const getMe = async (req , res , next) =>{
    const id = req.user.id;

    try{

        const user = await User.findOne({
            where : {id}
        })

        if(!user ){
            return res.status(404)
            .json({
                message : "User not found"
            })
        }

        res.status(200)
        .json({
            message : 'User fetch successfully'
        })

    }catch(err){
        next(err)
    }
}


/**
 * @desp protected route 
 */

export const logoutUser = async (req , res , next) => {

   try{

     const token = req.cookies.token
     // save for black list

     res.clearCookie('token')


     return res.status(200)
     .json({
        message : "User logout successfully"
     })




   }
   catch(err){
    next(err);
   }

}