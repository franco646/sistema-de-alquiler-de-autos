const { check } = require('express-validator');

module.exports = [
  check('nombres', 'Nombres del cliente incompleto')
    .isString()
    .notEmpty()
    .isLength({ max: 100 })
    .trim(),
  check('apellidos', 'Apellidos del cliente incompleto')
    .isString()
    .notEmpty()
    .isLength({ max: 100 })
    .trim(),
  check('tipoDocumento')
    .isString()
    .notEmpty()
    .custom((value) => {
      const valor = value.toLowerCase().trim();
      switch (valor) {
        case 'dni':
          return true;
        case 'd.n.i':
          return true;
        case 'd.n.i.':
          return true;
        case 'lc':
          return true;
        case 'l.c':
          return true;
        case 'l.c.':
          return true;
        case 'pasaporte':
          return true;
        default:
          throw new Error('ingrese un tipo de documento valido');
      }
    })
    .trim(),
  check('numeroDocumento', 'Numero de documento del cliente incompleto')
    .isNumeric()
    .notEmpty()
    .isLength({ max: 100 }),
  check('fechaNacimiento', 'Fecha de nacmiento del cliente incompleto')
    .isDate()
    .notEmpty()
    .isLength({ max: 100 }),
  check('nacionalidad', 'Nacionalidad del cliente incompleto')
    .isString()
    .notEmpty()
    .isLength({ max: 100 })
    .trim(),
  check('direccion', 'Dirección del cliente incompleto')
    .isString()
    .notEmpty()
    .isLength({ max: 150 })
    .trim(),
  check('telefono', 'Telefono del cliente incompleto')
    .isNumeric()
    .notEmpty()
    .isLength({ max: 100 }),
  check('email', 'Email del cliente incompleto')
    .notEmpty()
    .isLength({ max: 100 })
    .isEmail()
    .withMessage('Ingrese un email valido')
    .normalizeEmail(),
  check('alquilerDesde', 'Fecha de inicio del alquiler incompleto')
    .isDate({ format: 'YYYY/MM/DD' })
    .notEmpty()
    .isLength({ max: 100 }),
  check('alquilerHasta', 'Fecha de finalizacion del alquiler incompleto')
    .isDate({ format: 'YYYY/MM/DD' })
    .notEmpty()
    .isLength({ max: 100 }),
  check('medioDePago')
    .isString()
    .notEmpty()
    .custom((value) => {
      const valor = value.toLowerCase().trim();
      switch (valor) {
        case 'efectivo':
          return true;
        case 'tarjeta':
          return true;
        default:
          throw new Error('ingrese un medio de pago valido');
      }
    })
    .trim(),
  check('total', 'Total incompleto')
    .isNumeric()
    .notEmpty()
    .isLength({ max: 100 }),
];
