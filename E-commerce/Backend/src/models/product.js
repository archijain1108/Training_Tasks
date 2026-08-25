'use strict';

export default (sequelize, DataTypes) => {

  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          len: {
            args: [3, 100],
            msg: "Title must be between 3 and 100 characters"
          }
        }
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          len: {
            args: [10, 200],
            msg: "Description must be between 10 and 200 characters"
          }
        }
      },


      price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,

        validate: {
          isDecimal: {
            msg: "Price must be a valid number"
          },

          min: {
            args: [1],
            msg: "Price must be at least 1"
          }
        }
      },


      imageByColor: {
        type: DataTypes.JSONB,
        allowNull: false
      },

      sellerId: {
        type: DataTypes.UUID,
        allowNull: false
      },


      subcategoryId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      timestamps: true,
      tableName: 'products'
    }
  );


  Product.associate = (models) => {


    Product.hasMany(models.Variant, {
      foreignKey: "productId"
    });



    Product.belongsTo(models.User, {
      foreignKey: "sellerId"
    });



    Product.belongsTo(models.Subcategory, {
      foreignKey: "subcategoryId"
    });

  };


  return Product;
};