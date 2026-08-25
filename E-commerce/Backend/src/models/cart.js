'use strict';



export default (sequelize, DataTypes) => {
  const Cart = sequelize.define(

    'Cart', {},
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tableName: 'carts'
    }
  );

  Cart.associate = (models) => {

    Cart.belongsTo(models.User, {
      foreignKey: "buyerId"
    })
    Cart.hasMany(models.CartItem, {
      foreignKey: "cartId"
    })
  };



  return Cart;
};
