'use strict';


module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('subcategories', {

      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'categories',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

     
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subcategories');
  }
};