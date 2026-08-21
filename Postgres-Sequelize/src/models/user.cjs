'use strict';


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(                                     
    'User' ,                       // model name          
    {
      firstName : {
        type : DataTypes.STRING,
        allowNull : false , 
      },
      lastName :{
        type : DataTypes.STRING,
        allowNull : false 
      },
      email : {
        type : DataTypes.STRING,
        allowNull: false,
        unique : true ,
        validate :{
          isEmail : true 
        }

      }

    }, {
      timestamps : true,
      paranoid : true ,    // soft delete 

      // tableName : app_user                       // (optional) custom table name  def- Users

    }
  )

  return User ;
    
};



// User.findAll()    -> SELECT * FROM Users
// User.create()  -> INSERT INTO Users ()