const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.postLogin = async (req, res, next) => {
  const { email } = req.body;
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.status(401).json({ error: errores.errors[0].msg }).end();
      const error = new Error('Error en la validacion del formulario');
      error.statusCode = 500;
      throw error;
    }

    const user = await User.findOne({ where: { email } });
    const payload = { name: user.nombreDeUsuario, id: user.id };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: 86400,
    });

    return res.status(201).json({
      error: null,
      accessToken,
      userData: {
        name: user.nombreDeUsuario,
        id: user.id,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.postSingup = async (req, res, next) => {
  const { email } = req.body;
  const { nombreDeUsuario } = req.body;
  const { contraseña } = req.body;

  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.status(401).json({ error: errores.errors[0].msg }).end();
      const error = new Error('Error en la validacion del formulario');
      error.statusCode = 500;
      throw error;
    }

    const contraseñaEncriptada = await bcrypt.hash(contraseña, 12);
    const user = await new User({
      email,
      nombreDeUsuario,
      contraseña: contraseñaEncriptada,
    });
    user.save();
    return res.status(200).json({ messaje: 'Usuario creado con exito' }).end();
  } catch (error) {
    return next(error);
  }
};
