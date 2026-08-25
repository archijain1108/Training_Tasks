'use strict';


export default (sequelize, DataTypes) => {
  const SubOrder = sequelize.define(
    'SubOrder',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalAmount: {
        type: DataTypes.DECIMAL

      },
      status: {
        type: DataTypes.STRING

      },
      status: {
        type: DataTypes.ENUM(
          'confirmed',
          'processing',
          'shipped',
          'delivered',
          'cancelled'
        ),
        allowNull: false,
        defaultValue: 'confirmed'
      }
    },
    {

      tableName: 'suborders',
      timestamps: true
    });

  SubOrder.association = (models) => {
    SubOrder.belongsTo(models.Order, {
      ForeignKey: 'orderId'
    })
  }
  return SubOrder;
};