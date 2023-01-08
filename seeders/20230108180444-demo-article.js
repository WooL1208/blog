'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = ['生活', '科技', '美食', '理財']
    await queryInterface.bulkInsert('articles',
      Array.from({ length: 50 }).map(d =>
        ({
          user_id: Math.floor(Math.random() * 50 + 1),
          category: categories[Math.floor(Math.random() * 4)],
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
        })
      ),{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};
