const { validationResult } = require('express-validator');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const User = require('../models/user');
const Auto = require('../models/auto');
const Cliente = require('../models/cliente');
const Rental = require('../models/rental');
const calcularTotal = require('../routes/util/dateCalculation');

exports.postAddClient = async (req, res, next) => {
  const {
    carId,
    userId,
    nombres,
    apellidos,
    tipoDocumento,
    numeroDocumento,
    nacionalidad,
    direccion,
    telefono,
    email,
    fechaNacimiento,
    alquilerDesde,
    alquilerHasta,
    medioDePago,
  } = req.body;

  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      const error = new Error('Error en la validacion del formulario');
      error.statusCode = 500;
      throw error;
    }

    const auto = await Auto.findByPk(carId);
    const user = await User.findByPk(userId);
    const total = calcularTotal(
      alquilerDesde,
      alquilerHasta,
      auto.precioAlquilerPorDia,
    );
    const rental = await user.createRental({
      alquilerDesde,
      alquilerHasta,
      medioDePago,
      total,
      estado: 'Alquilado',
    });
    const client = await Cliente.create({
      nombres,
      apellidos,
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      nacionalidad,
      direccion,
      telefono,
      email,
    });
    auto.disponible = false;
    auto.save();
    rental.setAuto(auto);
    rental.setCliente(client);

    const rentalWithIncludes = await Rental.findOne({
      where: {
        id: rental.id,
      },
      include: [
        { model: Auto },
        { model: Cliente },
      ],
    });

    return res.status(200).json({ rental: rentalWithIncludes });
  } catch (error) {
    return next(error);
  }
};

exports.getRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.findAll({
      include: [
        { model: Auto },
        { model: Cliente },
      ],
    });
    res.status(200).json({ alquileres: rentals });
  } catch (error) {
    next(error);
  }
};

exports.postReturnCar = async (req, res, next) => {
  const { rentalId } = req.params;
  try {
    const rental = await Rental.findByPk(rentalId);
    rental.estado = 'Finalizado';
    await rental.save();

    const auto = await rental.getAuto();
    auto.disponible = true;
    await auto.save();

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

exports.postDeleteRental = async (req, res, next) => {
  const { rentalId } = req.params;
  try {
    const rental = await Rental.findByPk(rentalId);
    const cliente = await rental.getCliente();

    await cliente.destroy();
    await rental.destroy();

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

exports.getDownloadRental = async (req, res, next) => {
  const { rentalId } = req.params;
  try {
    const rental = await Rental.findOne({
      where: {
        id: rentalId,
      },
      include: [
        { model: Auto },
        { model: Cliente },
      ],
    });

    const namePDF = `${rental.id}.pdf`;
    const pathPDF = path.join('data', 'PDF', namePDF);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pathPDF));
    doc.pipe(res);
    doc.fontSize(25).text('Alquiler de autos', {
      align: 'center',
    }).moveDown();
    doc.fontSize(20).text('Datos del alquiler', {
      underline: true,
    });
    doc.fontSize(13).list([
      `Alquiler desde: ${rental.alquilerDesde}`,
      `Alquiler hasta: ${rental.alquilerHasta}`,
      `Medio de pago: ${rental.medioDePago}`,
      `Estado: ${rental.estado}`,
      `Total: $${rental.total}`,
    ]).moveDown();
    doc.fontSize(20).text('Datos del cliente', {
      underline: true,
    });
    doc.fontSize(13).list([
      `Nombre: ${rental.cliente.nombres} ${rental.cliente.apellidos}`,
      `Numero de telefono: ${rental.cliente.telefono}`,
      `Email: ${rental.cliente.email}`,
      `Documento: ${rental.cliente.tipoDocumento} ${rental.cliente.numeroDocumento}`,
      `fecha de nacimiento: ${rental.cliente.fechaNacimiento}`,
      `Nacionalidad: ${rental.cliente.nacionalidad}`,
    ]).moveDown();
    doc.fontSize(20).text('Datos del vehículo', {
      underline: true,
    });
    doc.fontSize(13).list([
      `Vehículo: ${rental.auto.marca} ${rental.auto.modelo}`,
      `Kilometros: ${rental.auto.kms}`,
      `Color: ${rental.auto.color}`,
      `Aire acondicionado: ${rental.auto.aireAcondicionado}`,
      `Caja: ${rental.auto.manualAutomatico}`,
      `Precio de alquiler por dia: $${rental.auto.precioAlquilerPorDia}`,
    ]);
    doc.end();
  } catch (error) {
    next(error);
  }
};
