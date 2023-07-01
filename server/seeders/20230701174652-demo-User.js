'use strict';
const { hashPassword } = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require('../data/users.json')
    users.forEach(e => {
      e.password = hashPassword(e.password)
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Users', users, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
