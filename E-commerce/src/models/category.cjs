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
  );

  Category.associate = (models) => {

    Category.hasMany(models.Subcategory, {
      foreignKey: "categoryId"
    });

    Category.belongsTo(models.User, {
      foreignKey : 'adminId'
    })

  };

  return Category;
};