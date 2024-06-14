const { Sequelize, DataTypes } = require('sequelize');

('use strict');
/** @type {import('umzug').RunnableMigration<import('sequelize').QueryInterface>} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex('Users', ['email'], {
      unique: true,
      name: 'users_email_unique',
    });
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('Users');
  },
};
