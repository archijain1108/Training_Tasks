'use strict';


module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Subcategories', {

      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: 'Categories',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subcategories');
  }
};