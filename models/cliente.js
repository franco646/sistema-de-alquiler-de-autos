const Sequelize = require('sequelize');

const sequelize = require('../routes/util/db');

const Cliente = sequelize.define('cliente', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nombres: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apellidos: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tipoDocumento: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numeroDocumento: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  fechaNacimiento: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nacionalidad: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  direccion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefono: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Cliente;
