import { createUserService, getAllUserService, getUserByIdService, deleteUserService, updateUserService } from "../models/user.model.js";



const responseHandler = (res, status, message, data = null) => {
    return res.status(status)
        .json({
            message,
            data
        })
}


export const createUser = async (req, res, next) => {
    const { name, email } = req.body;

    try {
        const newUser = await createUserService(name, email);
        responseHandler(res, 201, 'User created successfully', newUser);
    }
    catch (err) {
        next(err)
    }
}


export const getAllUser = async (req , res , next) => {
    try {
        const allUser = await getAllUserService();
        responseHandler(res, 200, "all Users fetch successfully", allUser);

    }
    catch (err) {
        next(err);
    }
}


export const getUserById = async (req , res , next) =>{
    const {id} = req.params;
    try{
        const user = await getUserByIdService(id);

        if(!user){
           return  responseHandler(res , 404 , 'user not found')
        }
        responseHandler(res , 200 , "user fetch successfully" ,user);

    }
    catch(err){
        next(err);
    }
}


export const deleteUser = async (req , res , next) =>{
    const {id} = req.params;

    try{
        const user = await deleteUserService(id);
        if(!user){
            return responseHandler(res , 404 , 'user not found');
        }
        responseHandler(res , 204 , 'user deleted successfully' , user);
    }
    catch(err){
        next(err);
    }
}

export const updateUser = async (req , res , next) =>{    
    const {name , email} = req.body ;
    const id = req.params.id;

    try{
        const updatedUser = await updateUserService(id , name , email);
        console.log("updated " , updateUser);
        
        if(!updatedUser) {
            return responseHandler(res , 404 , "user not found")
        }
        responseHandler(res , 200  , 'user updated successfully' , updatedUser);
    }
    catch(err){
        next(err);
    }
}