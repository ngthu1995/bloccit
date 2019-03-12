"use strict";

const faker = require("faker");

//#2
let topics = [];

for (let i = 1; i <= 15; i++) {
  topics.push({
    title: faker.hacker.noun(),
    description: faker.hacker.phrase(),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Topics", topics, {});

    Example: return queryInterface.bulkInsert(
      "Person",
      [
        {
          name: "John Doe",
          isBetaMember: false
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Topics", null, {});
  }
};
