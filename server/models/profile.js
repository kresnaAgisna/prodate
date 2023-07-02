'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Profile.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  Profile.init({
    firstName: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
      notEmpty: {
        msg: 'First name is required'
      },
      notNull: {
        msg: 'First name is required'
      }
     } 
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notEmpty: {
         msg: 'Last name is required'
       },
       notNull: {
         msg: 'Last name is required'
       }
      } 
     },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notEmpty: {
         msg: 'Gender is required'
       },
       notNull: {
         msg: 'Gender is required'
       },
       isIn: {
        args: [['Female', 'Male']],
        msg: 'Gender must be either Female or Male'
       }
      } 
     },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
       notEmpty: {
         msg: 'Age is required'
       },
       notNull: {
         msg: 'Age is required'
       }
      } 
     },
    location: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
       notEmpty: {
         msg: 'User ID is required'
       },
       notNull: {
         msg: 'User ID is required'
       }
      } 
     }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};