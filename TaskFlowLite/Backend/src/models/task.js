'use strict';

export default (sequelize, DataTypes) => {

  const Task = sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User is required'
          }
        },
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title is required'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Description is required'
          }
        }
      },
      status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending',
        allowNull: false
      },

      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium',
        allowNull: false
      },

      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Due date must be a valid date'
          },
          notNull: {
            msg: 'Due date is required'
          }
        }
      },



    },
    {
      tableName: 'tasks',
      pranoid : true,
      deletedAt : 'deletedAt'

    }
  )

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  }




  return Task;
};
