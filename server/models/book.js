'use strict';
module.exports = function(sequelize, DataTypes) {
  var book = sequelize.define('book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    year: DataTypes.STRING,
    path: DataTypes.STRING
    }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // book.belongsTo(models.Bookshelf)
      }
    }
  });
  return book;
};