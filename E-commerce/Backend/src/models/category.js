
export default (sequelize, DataTypes) => {

  const Category = sequelize.define(
    'Category',
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
      }
    }
    , {
      tableName: 'categories'
    }
  );

  Category.associate = (models) => {

    Category.hasMany(models.Subcategory, {
      foreignKey: "categoryId"
    });



  };

  return Category;
};