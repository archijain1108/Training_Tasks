'use strict';


module.exports = (sequelize, DataTypes) => {
 const Order = sequelize.define(
  'Order' , 
  {
    buyerId : {
      type : DataTypes.INTEGER,
      allowNull : false,
      references : {
        model : 'users',
        key : 'id'
      },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE'
    },

    totalAmount : {
      type : DataTypes.INTEGER,
      allowNull: false
    },
    status : {
      type : DataTypes.ENUM('confirmed' , 'Delivered' , 'Processing'),
      allowNull : false,
      validate : {
          isIn : {
            args : ['confirmed' , 'Delivered' , 'Processing'],
            msg : "order status must be valid"
          }        
      }

    },



  } , {
    timestamps : true ,
    tableName : 'orders'
  }

 )

 Order.associate = (models) => {
   Order.belongsTo(models.User , {
    foreignKey : "buyerId"
   }) 
 }

 return Order ;
};