
export const registerSchema = {
    type: "object",

    properties: {
        username: { type: "string" },

        email: { type: "string", format: "email" },

        password: {
            type: "string",
            minLength: 4,
            maxLength: 8
        }
    },
    required: ["username", "email", "password"],
    additionalProperties: false
}


export const loginSchema = {
    type: "object",

    properties: {
        email: { type: "string", format: "email" },

        password: {
            type: "string",
            minLength: 4,
            maxLength: 8
        }
    },
    required: ["email", "password"],
    additionalProperties: false
}
