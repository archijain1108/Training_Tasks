'use strict';
const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
          notNull: {
            msg: "Enter your Email"
          }
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Enter your password"
          }
        }
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
          len: [10, 10],
          notNull: {
            msg: "Enter your Contact number"
          }
        }
      },

      role: {
        type: DataTypes.ENUM('buyer', 'seller'),
        allowNull: false,
        defaultValue: 'buyer',
        validate: {
          isIn: {
            args: [['buyer', 'seller' , 'admin']],
            msg: "role can be buyer or seller only"
          }
        }
      }

    },
    {
      timestamps: true,
      tableName: 'users',
      defaultScope: {
        attributes: { 
          exclude: ['password'] }
      },

      scopes: {
        withPassword: {
          attributes: {
            include: ['password']
          }
        }
      }

    }
  )


  User.beforeCreate(async (user) => {
    user.password = await bcryptjs.hash(user.password, 10);
  })

  User.prototype.comparePassword = async function (plainPassword) {
    return bcryptjs.compare(plainPassword, this.password)
  }

  User.associate = (models) => {
    User.hasMany(models.Product, {
      foreignKey: "sellerId"
    })

    User.hasOne(models.Cart, {
      foreignKey: "buyerId"
    })

    User.hasMany(models.Order, {
      foreignKey: 'buyerId'
    })

    User.hasMany(models.Category, {
      foreignKey: 'adminId'
    })
  }


  return User;
};