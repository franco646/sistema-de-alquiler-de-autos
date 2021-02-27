const Sequelize = require('sequelize');

const sequelize = require('../routes/util/db');

const Auto = sequelize.define('auto', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  marca: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  modelo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  año: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  kms: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagen: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  aireAcondicionado: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pasajeros: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  manualAutomatico: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  precioAlquilerPorDia: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  disponible: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Auto;
