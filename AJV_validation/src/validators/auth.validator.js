import ajv from "./ajv.js";

const registerSchema = {
    type: "object",

    required: ["username", "email", "password"],

    properties: {
        username: {
            type: "string",
            minLength: 3
        }, 

        email: {
            type: "string",
            format: "email"
        },

        password: {
            type: "string",
            minLength: 6
        }
    },

    additionalProperties: false
};

export const validateUserRegister = ajv.compile(registerSchema);     




const loginSchema = {
    type: "object",

    required: ["email", "password"],

    properties: {

        email: {
            type: "string",
            format: "email"
        },

        password: {
            type: "string",
            minLength: 6
        }
    },

    additionalProperties: false
};



export const validateUserLogin = ajv.compile(loginSchema)



// takes rules of schema then prepair validation function which is called inside middleware ie callback by passing req.body for validation

    
