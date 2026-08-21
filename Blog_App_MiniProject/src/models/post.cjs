'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 
  const Post = sequelize.define(
    "Post" , 
    {
      title : {
        type : DataTypes
      }

    }
  )
 
  return post;
};