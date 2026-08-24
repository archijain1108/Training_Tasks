import db from "../models/index.cjs";

const { Payment, Cart, CartItem, Variant, Product, Order , SubOrder , OrderItem , sequelize } = db;

export const createPayment = async (req, res, next) => {
    try {

        const buyerId = req.user.id;


        const result = await sequelize.transaction(async t => {


            const userCart = await Cart.findOne({
                where: {
                    buyerId
                },

                include: [
                    {
                        model: CartItem,
                        attributes: [
                            "id", "productId", "variantId", "quantity"
                        ],

                        include: [
                            {
                                model: Variant,
                                attributes: [
                                    "id", "price", "stock", "color", "attributes"
                                ]
                            },
                            {
                                model: Product,
                                attributes: ['title', 'sellerId']
                            }
                        ]
                    }
                ]
            });

            if (!userCart || userCart.CartItems.length === 0) {
                return res.status(404).json({
                    message: "Cart is empty"
                });
            }


            let totalAmount = 0;

            for (const item of userCart.CartItems) {

                if (item.quantity > item.Variant.stock) {
                    return res.status(400).json({
                        message: `only ${item.Variant.stock} stock available for ${item.Product.title}`
                    });
                }

                totalAmount += Number(item.Variant.price) * item.quantity;
            }


            const payment = await Payment.create({
                amount: totalAmount,
                buyerId,
                razorpayOrderId: "testOrderId1"


            })


            return payment

      })
    


        return res.status(200).json({
        message: "Checkout details fetched",
        payment: result,

    });




} catch (err) {
    next(err);
}
};


// verify signature then create order , suborder , order item

export const verifyPayment = async (req, res, next) => {
    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const buyerId = req.user.id;

        const payment = await Payment.findOne({
            where: {
                razorpayOrderId: razorpay_order_id,
                buyerId,
                status: "pending"
            }
        });

        if (!payment) {
            return res.status(404).json({
                message: "Payment data not found" });
        }

        // verify signature remaining


        const result = await sequelize.transaction(async t => {


            const userCart = await Cart.findOne({
                where: {
                    buyerId
                },

                include: [
                    {
                        model: CartItem,
                        attributes: [
                            "id", "productId", "variantId", "quantity"
                        ],

                        include: [
                            {
                                model: Variant,
                                attributes: [
                                    "id",
                                    "productId",
                                    "price",
                                    "stock",
                                    "color",
                                    "attributes"
                                ],
                                transaction: t
                            },
                            {
                                model: Product,
                                attributes: [
                                    "id",
                                    "title",
                                    "sellerId"
                                ]
                            }
                        ]
                    }
                ],

                transaction: t,
               
            });


            if (!userCart || userCart.CartItems.length === 0) {
                throw new Error("Cart is empty");
            }


            // Recheck stock and calculate amount

            let totalAmount = 0;

            for (const item of userCart.CartItems) {

                const variant = item.Variant;

                if (!variant) {
                    throw new Error(
                        `Variant ${item.variantId} not found`
                    );
                }

                if (item.quantity > variant.stock) {
                    throw new Error(
                        `Only ${variant.stock} stock available for ${item.Product.title}`
                    );
                }

                totalAmount += Number(variant.price) * item.quantity;
            }

            if (totalAmount !== Number(payment.amount)) {
                throw new Error("Payment amount does not match cart amount");
            }


            // Create Order

            const order = await Order.create({
                buyerId,
                totalAmount: payment.amount
            }, {
                transaction: t
            });

            console.log('order created' , order)


            // Group items seller-wise

            const sellerGroups = {};

            for (const item of userCart.CartItems) {
                const sellerId = item.Product.sellerId;

                if (!sellerGroups[sellerId]) {
                    sellerGroups[sellerId] = [];
                }
                sellerGroups[sellerId].push(item);
            }


            // 8. Create SubOrders + OrderItems

            const subOrders = [];
            let order_items = null ;


            for (const sellerId of Object.keys(sellerGroups)) {

                const sellerItems = sellerGroups[sellerId];

                let subOrderTotal = 0;

                for (const item of sellerItems) {
                    subOrderTotal += Number(item.Variant.price) * item.quantity;
                }


                // Create seller's SubOrder


                const subOrder = await SubOrder.create({

                    orderId: order.id,
                    sellerId: Number(sellerId),
                    totalAmount: subOrderTotal,
                    status: "confirmed"

                }, {
                    transaction: t
                });


                subOrders.push(subOrder);

              
                // Create OrderItems
                for (const item of sellerItems) {

                    const variant = item.Variant;
                    const product = item.Product;

                    const itemTotal =
                        Number(variant.price) *
                        item.quantity;


                     order_items = await OrderItem.create({

                        orderId: order.id,
                        subOrderId: subOrder.id,
                        sellerId: product.sellerId,

                        productId: product.id,
                        variantId: variant.id,
                        quantity: item.quantity,
                        price: Number(variant.price),
                        itemTotal,
                        productTitle: product.title,
                        variantColor: variant.color,
                        variantAttributes: variant.attributes

                    }, {
                        transaction: t
                    });

                    variant.stock -= item.quantity;

                    await variant.save({
                        transaction: t
                    });
                }
            }

            await payment.update({

                status: "paid",
                razorpayPaymentId: razorpay_payment_id,
                signature: razorpay_signature

            }, {
                transaction: t
            });



            await CartItem.destroy({
                where: {
                    cartId: userCart.id
                },
                transaction: t
            });


            return {
                order,
                subOrders,
                order_items
            };
        });


        return res.status(200).json({
            message: "Payment verified and order created successfully",
            order: result.order,
            subOrders: result.subOrders,
            order_items : result.order_items
        });


    } catch (err) {
        next(err);
    }
};