'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Variants', {

      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },

      productId: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: 'Products',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      color: {
        type: Sequelize.STRING,
        allowNull: false
      },

      attributes: {
        type: Sequelize.JSONB,
        allowNull: false
      },

      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      price: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: true
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

    await queryInterface.dropTable('Variants');

  }

};