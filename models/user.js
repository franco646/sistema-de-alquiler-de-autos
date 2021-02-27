const Sequelize = require('sequelize');

const sequelize = require('../routes/util/db');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nombreDeUsuario: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contraseña: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
