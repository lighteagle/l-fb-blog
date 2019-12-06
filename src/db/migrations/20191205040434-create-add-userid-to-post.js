"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("posts", "userId", Sequelize.INTEGER, {
      after: "content"
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("posts", "userId");
  }
};
