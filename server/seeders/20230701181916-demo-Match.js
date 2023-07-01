'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const matches = require('../data/match.json')
    matches.forEach(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Matches', matches, {})
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Matches', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
