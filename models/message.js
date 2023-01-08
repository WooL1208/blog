'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.belongsTo(models.user, {
        foreignKey: 'user_id',
      });
      message.belongsTo(models.article, {
        foreignKey: 'article_id',
      });
    }
  }
  message.init({
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
    id: DataTypes.INTEGER,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};