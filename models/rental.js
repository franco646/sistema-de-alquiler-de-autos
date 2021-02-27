const Sequelize = require('sequelize');

const sequelize = require('../routes/util/db');

const Rental = sequelize.define('rental', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  alquilerDesde: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  alquilerHasta: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  medioDePago: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Rental;
