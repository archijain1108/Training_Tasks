import db from '../models/index.cjs'

console.log('db object print ' , Object.keys(db));


const { User } = db;



export const createUser = async (req, res , next ) => {
    const { firstName, lastName, email } = req.body;
    console.log(firstName , lastName , email);
    
    try {

        const userExists = await User.findOne({ where: { email : email } })
        console.log(userExists)

        if ( userExists) {
            return res.status(403)
                .json({
                    message: 'User already exists'
                })
        }

        const user = await User.create({ firstName, lastName, email })

        res.status(200)
            .json({
                message: "User created",
                user
            })
    }
    catch (err) {
        next(err);
    }
}


export const getAllUsers = async ( req , res , next) => {
    try{
        const users = await User.findAll();

        return res.json({
            message : 'get user fetch successfully',
            users
        })

    }catch(err){
        next(err)
    }
}


export const getUserById = async (req , res , next)=>{
    const id = req.params.id;
    try{
        const user = await User.findByPk(id);

        if(!user){
            return res.status(404)
            .json({
                message : "user not found"
            })
        }

        return res.status(200)
        .json({
            message : "user fetch successfully",
            user
        })
    }
    catch(err){
        next(err);
    }
}

export const updateUserById = async (req , res , next) =>{
    const id = req.params.id;
    const {firstName , lastName , email} = req.body ;

    try{
        const user =  await User.findByPk(id);
        if(!user){
            return res.status(404)
            .json({
                message : 'user not found'
            })
        }

        const updatedUser = await user.update({
            firstName,
            lastName,
            email
        })

        res.status(201)
        .json({
            message : 'user updated successfully',
            updatedUser
        })
        

    }
    catch(err){
        next(err);
    }
}


export const deleteUserById = async (req , res , next) =>{
    const id = req.params.id

    try{
         // User.destroy({where : {id}})

        const user = await User.findByPk(id)
        if(!user) {
            return res.json({
                message : 'user not found'
            })
        }

        const deletedUser = user.destroy({
            where : {
                id
            }  
            , force : true          // hard delete 
        });

       
        return res.json({
            message : 'user deleted successfully',
            deletedUser
        })

    }
    catch(err){
        next(err)
    }
}