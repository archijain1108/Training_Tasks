import bcryptjs from 'bcryptjs'

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true ,
        validate :{
          notNull : {
            msg : 'Username is required'
          }
        }

      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true ,
        validate: {
          isEmail: true,
          notNull : {
            msg : 'Password is required'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 8],
          notNull : {
            msg : 'Password is required'
          }

        }
      }

    },
    {
      tableName : 'users'
    }
  )

  User.beforeCreate(async (user) => {
    user.password = await bcryptjs.hash(user.password, 10);
  })

  User.prototype.comparePassword = async function (plainPassword) {
    return bcryptjs.compare(plainPassword, this.password)
  }

  User.associate = (models) => {
    User.hasMany(models.Task, {
      foreignKey: 'userId',  
    });
    
  }

  return User
};



