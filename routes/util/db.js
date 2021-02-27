const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/db.sqlite',
});

module.exports = sequelize;
