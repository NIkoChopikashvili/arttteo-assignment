"use strict";

const { sq: sequelize } = require("../config/db-setup");

require("dotenv").config();

const db = {
  UserModel: require("./User.Model")(sequelize),
  UserSocialModel: require("./UserSocial.Model")(sequelize),
};

// Associate models
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;
