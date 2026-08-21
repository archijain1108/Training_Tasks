import Ajv from 'ajv';
import addFormats from 'ajv-formats'

const ajv = new Ajv();
addFormats(ajv);

const userSchema = {
    type : "object",

    required : ["firstName" , "lastName" , "email"],

    properties :{
        firstName : {
            type : "string",
            minLength : 3
        },
        lastName :{
            type : "string",
            minLength : 3
        },
        email :{
            type : "string",
            format : "email"
        }
    }
}

const validateUser = ajv.compile(userSchema);

export const validateUserInput = (req , res , next) =>{
        const valid = validateUser(req.body)

        if(!valid ){
            return res.status(400)
            .json({
                message : "invalid Input",
                error : validateUser.errors[0]?.message
            })
        }
        next();


}

