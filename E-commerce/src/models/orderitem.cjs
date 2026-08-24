'use strict';


module.exports = (sequelize, DataTypes) => {
 const OrderItem = sequelize.define(
  'OrderItem',
  {
    orderId: {
      type : DataTypes.INTEGER,
      allowNull : false 
    },
    subOrderId: {
      type : DataTypes.INTEGER,
      allowNull : false 
    },
    sellerId: {
      type : DataTypes.INTEGER,
      allowNull : false 
    },
    productId: {
      type : DataTypes.INTEGER,
      allowNull : false 
    },
    variantId: {
      type : DataTypes.INTEGER,
      allowNull : false 
    },
    quantity: {
      type : DataTypes.INTEGER,
      allowNull : false 
    },
    price: {
      type : DataTypes.DECIMAL,
      allowNull : false 
    },
    itemTotal: {
      type : DataTypes.DECIMAL,
      allowNull : false 
    },
    productTitle: {
      type : DataTypes.STRING,
      allowNull : false
    },
    variantColor:{
      type : DataTypes.STRING,
      allowNull : false
    },
    variantAttributes:{ 
      type : DataTypes.JSON
    }
  }, {
    
    tableName: 'order_items',
  });
  return OrderItem;
};