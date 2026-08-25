import 'dotenv/config'
import db from '../models/index.js'
import {Op} from "sequelize"
import jwt from 'jsonwebtoken'



// console.log(Object.keys(db));
// console.log(Op);



const {User} = db;

const createAndSetToken = ( user , res ) =>{

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


export const registerUser = async (req , res , next) =>{
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

        console.log('user exists - ' , userExists)

        const newUser = await User.create({
            fullname ,
            password,
            email,
            contact,
            role
        })

        const user = newUser.toJSON()
        delete user.password;


        createAndSetToken(user , res );

         // user without password field
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

        const user = await User.scope('withPassword').findOne({
            where : {email}
        })

        if(!user ){
            return res.status(404)
            .json({
                message : "User not found"
            })
        }

        const isValidPassword = await user.comparePassword(password);

        if(! isValidPassword){
            return res.status(401)
            .json({
                message : "User not found"
            })
        }


        createAndSetToken(user , res)

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
    console.log('controller run ');
    

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

        return res.status(200)
        .json({
            message : 'User fetch successfully',
            user
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