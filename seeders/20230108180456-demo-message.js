'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages',
      Array.from({ length: 50 }).map(d =>
        ({
          user_id: Math.floor(Math.random() * 50 + 1),
          article_id: Math.floor(Math.random() * 50 + 1),
          content: faker.lorem.paragraphs(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
        })
      ),{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
