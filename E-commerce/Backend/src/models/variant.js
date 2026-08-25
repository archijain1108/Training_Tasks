'use strict';

export default (sequelize, DataTypes) => {

  const Variant = sequelize.define(
    "Variant",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false
      },

      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Color is required"
          }
        }
      },

      attributes: {
        type: DataTypes.JSONB,
        allowNull: false
      },

      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "Stock cannot be negative"
          }

        }
      },

      price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
        validate: {
          min: {
            args: [1],
            msg: "Price must be at least 1"
          }
        }
      }
    },
    {
      tableName: 'variants',
      timestamps: true

    }
  );

  Variant.associate = (models) => {
    Variant.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
  };

  return Variant;
};