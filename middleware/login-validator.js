const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports = [
  check('email')
    .isEmail()
    .withMessage('Por favor ingrese un email valido')
    .custom((value) => User.findOne({ where: { email: value } })
      .then((user) => {
        if (!user) {
          throw new Error('Email o contraseña incorrectos');
        }
        return true;
      }))
    .normalizeEmail(),
  check('contraseña', 'Ingrese su contraseña')
    .isAlphanumeric()
    .isLength({ min: 5 })
    .withMessage('Email o contraseña incorrectos')
    .custom((value, { req }) => User.findOne({ where: { email: req.body.email } })
      .then((user) => bcrypt.compare(value, user.contraseña)
        .then((result) => {
          if (!result) {
            throw new Error('Email o contraseña incorrectos');
          }
          return true;
        })))
    .trim(),
];
