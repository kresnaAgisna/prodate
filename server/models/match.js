'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Match.belongsTo(models.User, {foreignKey: 'followingId'})
      Match.belongsTo(models.User, {foreignKey: 'followerId'})
    }
  }
  Match.init({
    following: DataTypes.INTEGER,
    followed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};