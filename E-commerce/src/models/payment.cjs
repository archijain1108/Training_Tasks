'use strict';

module.exports = (sequelize, DataTypes) => {
 const Payment = sequelize.define(
   'Payment'
  ,{
    buyerId: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    amount: {
      type : DataTypes.DECIMAL(10 , 2),
      allowNull : false
    },
    status: {
      type : DataTypes.ENUM('pending' , 'paid' , 'failed'),
      allowNull : false ,
      defaultValue : 'pending'

    },
    razorpayOrderId: {
      type : DataTypes.STRING,
      // allowNull :false 

    },
    razorpayPaymentId: {
      type : DataTypes.STRING,

    },
    signature: {
      type : DataTypes.STRING,
    }
  }, {
    tableName: 'payments',
    
  });



  return Payment;
};