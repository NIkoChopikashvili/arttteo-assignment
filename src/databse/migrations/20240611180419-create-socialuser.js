const { Sequelize, DataTypes } = require("sequelize");

("use strict");
/** @type {import('umzug').RunnableMigration<import('sequelize').QueryInterface>} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("UserSocials", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.fn("gen_random_uuid"),
      },
      socialId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      source: {
        type: DataTypes.ENUM("facebook", "google"),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable("SocialUsers");
  },
};
