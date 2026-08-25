'use strict';

export default (sequelize, DataTypes) => {

  const Subcategory = sequelize.define(
    'Subcategory',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      categoryId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      tableName: 'subcategories'
    }
  );

  Subcategory.associate = (models) => {

    Subcategory.belongsTo(models.Category, {
      foreignKey: "categoryId"
    });

    Subcategory.hasMany(models.Product, {
      foreignKey: "subcategoryId"
    });

  };

  return Subcategory;
};