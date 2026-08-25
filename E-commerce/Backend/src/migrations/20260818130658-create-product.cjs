'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('products', {

      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
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
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'users',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
      },

  
      subcategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'subcategories',
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

    await queryInterface.dropTable('products');

  }

};