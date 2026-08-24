'use strict';

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      productId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      variantId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName : 'cartItems',
      indexes: [
        {
          unique: true,
          fields: ["cartId", "variantId"]
        }
      ]
    }
  )

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, {
      foreignKey: "cartId"
    })

    CartItem.belongsTo(models.Product, {
      foreignKey: "productId"
    });

    CartItem.belongsTo(models.Variant, {
      foreignKey: "variantId"
    });
  }



  return CartItem;
};