export const registerSchema = {
  type: "object",

  properties: {
    fullname: {
      type: "string",
      minLength: 3,
      maxLength: 100
    },

    email: {
      type: "string",
      format: "email"
    },

    contact: {
      type: "string",
      pattern: "^[0-9]{10}$"
    },

    password: {
      type: "string",
      minLength: 6
    },

    role: {
      type: "string",
      enum: ["buyer", "seller"]
    }
  },

  required: [
    "fullname", "email",  "contact",  "password"
  ],

  additionalProperties: false
};



export const loginSchema = {
  type: "object",

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

  required: [
    "email",
    "password"
  ],

  additionalProperties: false
};

