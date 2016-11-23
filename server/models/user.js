'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    hooks :{
      afterValidate: function(user){
        var hash = require('bcryptjs').hashSync(user.password, 8);
        user.password = hash;
      }
    }
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};