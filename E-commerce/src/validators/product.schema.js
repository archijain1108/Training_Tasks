
export const variantSchema = {
  type: "array",
  minItems: 1,

  items: {
    type: "object",

    properties: {

      color: {
        type: "string",
        minLength: 3
      },

      attributes: {
        type: "object",
        minProperties: 1,
        additionalProperties: true
      },

      stock: {
        type: "integer",
        minimum: 0
      },

      price: {
        type: "number",
        minimum: 1
      }

    },

    required: [
      "color",
      "attributes",
      "stock"
    ],

    additionalProperties: false
  }
};

export const productSchema = {

  type: "object",

  properties: {
    title: {
      type: "string",
      minLength: 3,
      maxLength: 100
    },

    description: {
      type: "string",
      minLength: 10,
      maxLength: 200
    },

    price: {
      type: "number",
      minimum: 1
    },



    variants: variantSchema

  },

  required: [
    "title",
    "description",
    "price",
    "variants"
  ],


};