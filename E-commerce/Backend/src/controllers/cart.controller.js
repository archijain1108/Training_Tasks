import db from "../models/index.js";

const { Cart , Product , Variant , CartItem } = db;



export const getCart = async (req, res, next) => {
    const buyerId = req.user.id;

    try {

        const cart = await Cart.findOne({
            where: { buyerId },

            include: [
              {
                model: CartItem,
                attributes : ['id' , 'cartId' , 'quantity'],
                include: [
                    {
                        model: Product,
                        attributes:['id' , 'title' , 'description' , 'imageByColor' ] 
                    },
                    {
                        model: Variant,
                        attributes : [ 'id', 'color' , 'attributes' , 'price' ]
                    }
                ]
            }
          ]
        })

        if (!cart) {
            return res.status(200).json({
                message: "Cart is empty",
                cart: null
            });
        }


        // ass decides property name 
        // CartItems[{Product : {} , Variant : {}} , ]
        let totalPrice = 0;

        const itemList = cart.CartItems.map((item) => {
          totalPrice += ( item.Variant.price * item.quantity);

          
          return {
              id : item.id,
              title : item.Product.title,
              description : item.Product.description,
              quantity : item.quantity,
              itemPrice : item.Variant.price * item.quantity,


              thumbnail : item.Product.imageByColor?.[item.Variant.color]?.[0] ?? null,
              color : item.Variant.color,
              attributes : item.Variant.attributes
          }
        })



       
        return res.status(200).json({
            message: "Cart fetched successfully",
            cart : {
              itemList,
              totalPrice
            },

        });


    }
    catch (err) {
        next(err);
    }

}


export const addToCart = async (req, res, next) => {
  try {

    const buyerId = req.user.id;
    const { productId, variantId } = req.params;
    const quantity = req.body?.quantity ?? 1;


    const variant = await Variant.findOne({
      where: {
        id: variantId,
        productId
      },
      include: [
        {
          model: Product
        }
      ]
    });

    console.log(variant)

    if (!variant) {
      return res.status(404).json({
        message: "Product variant not found"
      });
    }

    if (variant.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock"
      });
    }


    let cart = await Cart.findOne({
      where: {
        buyerId
      }
    })

    // Create cart if user does not have
    if (!cart) {
      cart = await Cart.create({
        buyerId
      });
    }

    // is Variant already exists in cart 
    let cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        variantId
      }
    });

    if (cartItem) {
      const newQ = cartItem.quantity + quantity;

      if (newQ > variant.stock) {
        return res.status(400).json({
          message: "exceeds available stock"
        });
      }

      cartItem.quantity = newQ;
      await cartItem.save();

    } else {

      cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        variantId,
        quantity
      });

    }

    return res.status(201).json({
      message: "Product added to cart",
      cartItem
    });

  } catch (err) {
    next(err);
  }
};




//params  itemId
export const increaseQuantity = async (req, res, next) => {
  try {
    const buyerId = req.user.id;
    const { itemId } = req.params;

    const cartItem = await CartItem.findOne({
      where: {
         id: itemId },
      include: [
        {
          model: Cart,
          where: { buyerId }
        },
        {
          model: Variant,
          attributes: ["id", "stock"]
        }
      ]
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    if (cartItem.quantity >= cartItem.Variant.stock) {
      return res.status(400).json({
        message: "No more stock available"
      });
    }

    cartItem.quantity += 1;

    await cartItem.save();


    
    return res.status(200).json({
      message: "Quantity increased",
      cartItem
    });

  } catch (err) {
    next(err);
  }
};


 
export const decreaseQuantity = async (req, res, next) => {
  try {
    const buyerId = req.user.id;
    const { itemId } = req.params;

    const cartItem = await CartItem.findOne({
      where: { id: itemId },
      include: [
        {
          model: Cart,
          where: { buyerId }
        }
      ]
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    if (cartItem.quantity == 1) {
      return res.status(400).json({
        message: "Quantity cannot be less than 1"
      });
    }

    cartItem.quantity -= 1;

    await cartItem.save();


    return res.status(200).json({
      message: "Quantity decreased",
      cartItem
    });

  } catch (err) {
    next(err);
  }
};


export const removeCartItem = async (req, res, next) => {
    
  try {


    const buyerId = req.user.id;
    const { itemId } = req.params;

    const cartItem = await CartItem.findOne({
      where: { id: itemId },
      include: [
        {
          model: Cart,
          where: { buyerId }
        }
      ]
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found"

      });
    }

    await cartItem.destroy();

    return res.status(200).json({
      message: "Item removed from cart"
    }
    );



  } catch (err) {
    next(err);
  }
};





export const clearCart = async (req, res, next) => {
  try {
    const buyerId = req.user.id;

    const cart = await Cart.findOne({
      where: { buyerId }
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    await CartItem.destroy({
      where: 
      {
        cartId: cart.id }
    });

    return res.status(200).json({
      message: "Cart cleared"
    });



  } catch (err) {
    next(err);
  }
};
