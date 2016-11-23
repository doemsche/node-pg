'use strict';
module.exports = function(sequelize, DataTypes) {
  var bookshelf = sequelize.define('bookshelf', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // bookshelf.hasMany(models.Book)
      }
    }
  });
  return bookshelf;
};