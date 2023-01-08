'use strict';

const { query } = require('express');
const { faker } = require('@faker-js/faker');
var argon2 = require('argon2');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword  = await argon2.hash('root');
    await queryInterface.bulkInsert('users', [{
      is_admin: 1,
      name: 'root',
      account: 'root',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
    await queryInterface.bulkInsert('users',
      Array.from({ length: 50 }).map(d =>
        ({
          is_admin: Math.round(Math.random()),
          name: faker.name.fullName(),
          account: faker.datatype.uuid(),
          password: faker.internet.password(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
        })
      ),{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
