'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.article, {
        foreignKey: 'user_id',
      });
      user.hasMany(models.message, {
        foreignKey: 'user_id',
      });
    }
  };
  user.init({
    id: DataTypes.INTEGER,
    is_admin: DataTypes.INTEGER,
    name: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};