'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    doc_type: DataTypes.STRING,
    document_name: DataTypes.STRING,
    document_comment: DataTypes.STRING,
    uploaded_month: DataTypes.STRING,
    uploaded_year: DataTypes.STRING,
    uploaded_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};