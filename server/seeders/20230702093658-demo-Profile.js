'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const profiles = require('../data/profiles.json')
    profiles.forEach(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Profiles', profiles, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
