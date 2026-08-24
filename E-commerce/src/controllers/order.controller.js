import db from "../models/index.cjs";
const {Order, SubOrder} = db;



export const getBuyerOrders = async (req , res , next) => {
     try{
        const buyerId = req.user.id

        const orders = await Order.findAll({
            where : {
                buyerId
            }
        })


        return res.status(200)
        .json({
            message : "orders fetch successfully",
            orders
        })
     }
     catch(err){
        next(err)
     }
}


export const getSellerOrders = async (req , res , next) =>{

      try{
        const sellerId = req.user.id

        const orders = await SubOrder.findAll({
            where : { sellerId }
        })


        return res.status(200)
        .json({
            message : "seller order fetch successfully",
            orders
        })


      }catch(err){
        next(err)
      }

}