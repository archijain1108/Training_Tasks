'use strict';

module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      adminId : {
        type : DataTypes.UUID,
        allowNull : false 
      }
    }
    ,{
      tableName : 'categories'
    }
  );

  Category.associate = (models) => {

    Category.hasMany(models.Subcategory, {
      foreignKey: "categoryId"
    });

   

  };

  return Category;
};