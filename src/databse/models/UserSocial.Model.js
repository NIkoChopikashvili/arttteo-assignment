"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class UserSocialModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSocialModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      socialId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      source: {
        type: DataTypes.ENUM("facebook", "google"),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "UserSocials",
    }
  );
  return UserSocialModel;
};
