import ajv from "../utils/ajv.js";

const validate = (schema) =>{

    const checkSchema = ajv.compile(schema);

    return (req , res , next) =>{

        const isValid = checkSchema(req.body) 

         if(! isValid){
             return res.status(400)
             .json({
                errors : checkSchema?.errors
             })
         }


        next()
    }

}

export default validate