'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doc_type: {
        type: Sequelize.STRING
      },
      document_name: {
        type: Sequelize.STRING
      },
      document_comment: {
        type: Sequelize.STRING
      },
      uploaded_month: {
        type: Sequelize.STRING
      },
      uploaded_year: {
        type: Sequelize.STRING
      },
      uploaded_time: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};