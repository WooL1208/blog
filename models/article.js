'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      article.belongsTo(models.user, {
        foreignKey: 'user_id',
      });
      article.hasMany(models.message, {
        foreignKey: 'article_id',
      });
    }
  }
  article.init({
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};