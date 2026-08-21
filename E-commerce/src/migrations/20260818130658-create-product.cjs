'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Products', {

      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false
      },

     
      price: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
      },

      
      imageByColor: {
        type: Sequelize.JSONB,
        allowNull: false
      },

      sellerId: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: 'Users',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
      },

  
      subcategoryId: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: 'Subcategories',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
        // if product of this category exists we can't deleted category 
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

    await queryInterface.dropTable('Products');

  }

};