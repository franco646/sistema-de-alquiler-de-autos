const { check } = require('express-validator');
const path = require('path');

module.exports = [
  check('marca', 'Todos los campos son obligatorios')
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 50 })
    .trim(),
  check('modelo', 'Todos los campos son obligatorios')
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 50 })
    .trim(),
  check('año', 'Todos los campos son obligatorios')
    .notEmpty()
    .isFloat({ min: 1000, max: 3000 })
    .withMessage('El año ingresado es incorrecto'),
  check('kms', 'Todos los campos son obligatorios')
    .notEmpty()
    .isFloat({ min: 0, max: 99999999999999999999999999999999999999999999999999 }),
  check('color', 'Todos los campos son obligatorios')
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 50 })
    .trim(),
  check('imagen', 'Ingrese una imagen')
    .custom((value, { req }) => {
      if (req.file) {
        const extension = (path.extname(req.file.originalname)).toLowerCase();
        switch (extension) {
          case '.jpg':
            return true;
          case '.jpeg':
            return true;
          case '.png':
            return true;
          default:
            throw new Error('ingrese una imagen valida (.jpg, jpeg o .png)');
        }
      }
      return false;
    }),
  check('aireAcondicionado', 'Todos los campos son obligatorios')
    .custom((value) => {
      const valor = value.toLowerCase().trim();
      switch (valor) {
        case 'si':
          return true;
        case 'no':
          return true;
        default:
          return false;
      }
    })
    .notEmpty()
    .isString()
    .isLength({ max: 2 })
    .trim(),
  check('pasajeros', 'Todos los campos son obligatorios')
    .notEmpty()
    .isNumeric()
    .isLength({ max: 3 }),
  check('manualAutomatico', 'Todos los campos son obligatorios')
    .custom((value) => {
      const valor = value.toLowerCase().trim();
      switch (valor) {
        case 'manual':
          return true;
        case 'automatica':
          return true;
        case 'automatico':
          return true;
        case 'automático':
          return true;
        default:
          return false;
      }
    })
    .isLength({ max: 20 })
    .notEmpty()
    .isString()
    .trim(),
  check('precioAlquiler', 'Todos los campos son obligatorios')
    .notEmpty()
    .isFloat({ min: 0, max: 99999999999999999999999999999999999999999999999999 }),
];
