const { check } = require('express-validator');

const User = require('../models/user');

module.exports = [
  check('email')
    .isEmail()
    .withMessage('Por favor ingrese un email valido')
    .custom((value) => User.findOne({ where: { email: value } })
      .then((existingUser) => {
        if (existingUser) {
          throw new Error('Este email ya se encuentra registrado, prueba con otro o inicia sesion');
        }
        return true;
      }))
    .normalizeEmail(),
  check('contraseña', 'Ingrese una contraseña')
    .isAlphanumeric()
    .isLength({ min: 5 })
    .withMessage('La contraseña debe tener 5 o mas caracteres alfanumericos')
    .trim(),
  check('confirmarContraseña')
    .custom((value, { req }) => {
      if (value !== req.body.contraseña) {
        throw new Error('Ambas contraseñas deben coincidir');
      }
      return true;
    }),
];
