'use strict';


export default (sequelize, DataTypes) => {

  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('confirmed', 'processing', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'confirmed'
      }
    },
    {
      timestamps: true,
      tableName: 'orders',
    });

  Order.association = (models) => {
    Order.hasMany(models.OrderItem, {
      ForeignKey: 'orderId'
    })
  }



  return Order;
};