'use strict';



module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    
    'Cart', {} , 
    {
      tableName : 'carts'
    }
  );

  Cart.associate = (models) => {
     
      Cart.belongsTo(models.User , {
        foreignKey : "buyerId"
      })
      Cart.hasMany(models.CartItem , {
        foreignKey : "cartId"
      })
  };



  return Cart;
};
