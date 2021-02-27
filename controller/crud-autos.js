const fs = require('fs');
const { validationResult } = require('express-validator');
const Auto = require('../models/auto');

exports.getHome = async (req, res, next) => {
  try {
    const autos = await Auto.findAll();
    if (!autos) {
      const error = new Error('No se encontro ningun auto');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ autos });
  } catch (error) {
    next(error);
  }
};

exports.postAddCar = async (req, res, next) => {
  const {
    marca,
    modelo,
    color,
    aireAcondicionado,
    manualAutomatico,
    precioAlquiler,
    año,
    kms,
    pasajeros,
  } = req.body;

  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      fs.unlink(req.file.path, () => {});
      const error = new Error(`se han producido el siguiente error " ${errores[0].msg} " en ${errores[0].param} al intentar validar el formulario`);
      error.statusCode = 500;
      throw error;
    }

    const auto = await Auto.create({
      marca,
      modelo,
      año,
      kms,
      color,
      imagen: req.file.path,
      aireAcondicionado,
      pasajeros,
      manualAutomatico,
      precioAlquilerPorDia: precioAlquiler,
      disponible: true,
    });

    auto.año = Number(auto.año);
    auto.kms = Number(auto.kms);
    auto.pasajeros = Number(auto.pasajeros);
    auto.precioAlquilerPorDia = Number(auto.precioAlquilerPorDia);
    res.status(200).json({ auto }).end();
  } catch (error) {
    next(error);
  }
};

exports.postEditCar = async (req, res, next) => {
  const { carId } = req.params;

  try {
    const todosLosErrores = validationResult(req);
    const errores = todosLosErrores.array().filter((error) => error.param !== 'imagen');
    if (errores.length > 0) {
      const error = new Error(`se han producido el siguiente error " ${errores[0].msg} " en ${errores[0].param} al intentar validar el formulario`);
      error.statusCode = 500;
      throw error;
    }

    const auto = await Auto.findByPk(carId);
    if (req.file) {
      fs.unlink(auto.imagen, () => {});
      auto.imagen = req.file.path;
    }
    auto.marca = req.body.marca;
    auto.modelo = req.body.modelo;
    auto.año = req.body.año;
    auto.kms = req.body.kms;
    auto.color = req.body.color;
    auto.aireAcondicionado = req.body.aireAcondicionado;
    auto.pasajeros = req.body.pasajeros;
    auto.manualAutomatico = req.body.manualAutomatico;
    auto.precioAlquilerPorDia = req.body.precioAlquiler;

    await auto.save();

    auto.año = Number(auto.año);
    auto.kms = Number(auto.kms);
    auto.pasajeros = Number(auto.pasajeros);
    auto.precioAlquilerPorDia = Number(auto.precioAlquilerPorDia);
    res.status(200).json({ auto }).end();
  } catch (error) {
    next(error);
  }
};

exports.postDeleteCar = async (req, res, next) => {
  const { carId } = req.params;
  try {
    const auto = await Auto.findByPk(carId);
    fs.unlinkSync(`${auto.imagen}`, () => { });
    await auto.destroy();
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

exports.getCarDetail = async (req, res, next) => {
  const { carId } = req.params;
  try {
    const auto = await Auto.findByPk(carId);
    if (!auto) {
      const error = new Error('No se encontro ningun auto');
      error.statusCode = 404;
      throw error;
    }
    const rentals = await auto.getRentals({ where: { autoId: carId } });
    if (!rentals) {
      const error = new Error('No se encontro ningun alquiler');
      error.statusCode = 404;
      throw error;
    }
    const rental = rentals[rentals.length - 1];
    res.status(200).json({
      auto,
      rental,
    });
  } catch (error) {
    next(error);
  }
};
